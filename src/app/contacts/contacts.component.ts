import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry, takeUntil } from 'rxjs/operators';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactModel } from '../models/contact.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  contacts: ContactModel[] = [];
  currentContact?: ContactModel;
  searchForm: FormGroup;

  searchText: string = '';
  searchContacts: ContactModel[] | null = null;
  searchModelChanged: Subject<string> = new Subject<string>();
  searchModelChangeSubscription!: Subscription;
  result: boolean = false;
  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.update();
    this.searchForm.get('searchQuery')?.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      debounceTime(400),
    )
    .subscribe(searchText => {
      this.searchText = searchText;
        this.updateSearch(searchText);
    });
  }

  private initForm() {
    this.searchForm = this.fb.group({
      searchQuery: new FormControl('')
    });
  }

  updateSearch(searchText: string) {
    if (!searchText) {
      this.searchContacts = null;
      return;
    }
    this.searchContacts = this.contacts.filter((x) =>
      (x.firstName + x.lastName + x.phone)
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }

  update() {
    this.apiService.getContacts()
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((x) => {
      this.contacts = x;
      this.updateSearch(this.searchText);
    });
  }

  addNewContactForm() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '261px',
    });

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(() => {
        this.update();
    });
  }

  unlinkContact() {
    this.currentContact = undefined;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
