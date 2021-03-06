import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { ContactModel } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  contacts: ContactModel[] = [];
  currentContact?: ContactModel;

  searchText?: string;
  searchContacts: ContactModel[] | null = null;
  searchModelChanged: Subject<string> = new Subject<string>();
  searchModelChangeSubscription!: Subscription;
  result: boolean = false;
  randomColor = Math.floor(Math.random()*16777215).toString(16);

  constructor() {}

  ngOnInit() {
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

  addContact() {
    this.randomColor = Math.floor(Math.random()*16777215).toString(16);
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
