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

  searchText?: string;
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
        if (!searchText) {
          this.searchContacts = null;
          return;
        }
        this.searchContacts = this.contacts.filter((x) =>
          (x.firstName + x.lastName + x.phone)
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
  }

  ngOnDestroy() {
    this.searchModelChangeSubscription.unsubscribe();
  }

  update() {
    this.apiService.getContacts().subscribe((x) => (this.contacts = x));
  }

  addContact() {
    this.apiService.addContact(this.currentContact)
    this.currentContact = new ContactModel();
    this.contacts.push(this.currentContact);
  }

  deleteThisContact(contact?: ContactModel, searchContacts?: ContactModel[]) {
    this.result = window.confirm(
      'Do you really want to delete this contact from your contacts list?'
    );
    if (this.result) {
      for (let i = this.contacts.length - 1; i >= 0; i--) {
        if (this.contacts[i] == contact) {
          this.contacts.splice(i, 1);
        }
      }

      if (this.searchContacts) {
        for (let i = this.searchContacts.length - 1; i >= 0; i--) {
          if (this.searchContacts[i] == contact) {
            this.searchContacts.splice(i, 1);
          }
        }
      }
      this.currentContact = undefined;
    }
  }
}
