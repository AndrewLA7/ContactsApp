import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: ContactModel[] = [];
  currentContact?: ContactModel;

  searchText: string = '';
  searchContacts: ContactModel[] | null = null;
  searchModelChanged: Subject<string> = new Subject<string>();
  searchModelChangeSubscription!: Subscription;
  result: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.update();
    this.searchModelChangeSubscription = this.searchModelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText) => {
        this.searchText = searchText;
        this.updateSearch(searchText);
      });
  }

  ngOnDestroy() {
    this.searchModelChangeSubscription.unsubscribe();
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
    this.apiService.getContacts().subscribe((x) => {
      this.contacts = x;
      this.updateSearch(this.searchText);
    });
  }

  addContact() {
    this.currentContact = new ContactModel();
    this.contacts.push(this.currentContact);
  }

  saveContact() {
    if (!this.currentContact) return;
    if (this.currentContact.id)
      this.apiService.editContact(this.currentContact).subscribe();
    else this.apiService.addContact(this.currentContact).subscribe();
    this.update();
  }

  deleteContact(contact?: ContactModel, searchContacts?: ContactModel[]) {
    this.result = window.confirm(
      'Do you really want to delete this contact from your contacts list?'
    );
    if (this.result && this.currentContact) {
      this.apiService.deleteContact(this.currentContact).subscribe();
      this.update();
      this.currentContact = undefined;
    }
  }
}
