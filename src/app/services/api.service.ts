import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { UserModel } from '../models/user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user?: UserModel;

  constructor(private httpClient: HttpClient) {
    const userJson = localStorage.getItem('user');
    if (userJson) this.user = JSON.parse(userJson);
  }

  login(login: string, password: string) {
    return this.getUser(login, password).pipe(
      map((x) => {
        if (!x) return null;
        localStorage.setItem('user', JSON.stringify(x));
        return (this.user = x);
      })
    );
  }

  logout() {
    this.user = undefined;
  }

  getUser(login: string, password: string) {
    return this.httpClient
      .get<UserModel[]>(
        environment.apiUrl + `users?login=${login}&password=${password}`
      )
      .pipe(map((x) => x[0]));
  }

  getContacts() {
    return this.httpClient.get<ContactModel[]>(environment.apiUrl + `contacts?userId=${this.user?.id}`);
  }

  addContact(contact: ContactModel) {
    contact.userId=this.user?.id;
    return this.httpClient.post<ContactModel>(
      environment.apiUrl + `contacts`,
      contact
    );
  }

  deleteContact(contact: ContactModel) {
    return this.httpClient.delete<ContactModel>(
      environment.apiUrl + `contacts/${contact.id}`
    );
  }

  editContact(contact: ContactModel) {
    return this.httpClient.put<ContactModel>(
      environment.apiUrl + `contacts/${contact.id}`,
      contact
    );
  }
}
