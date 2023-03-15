import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactPreviewComponent } from './contact-preview/contact-preview.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DetailedInfoComponent } from './detailed-info/detailed-info.component';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './login-page/login.module';
import { DetailedModule } from './detailed-info/detailed.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent, 
    AddContactComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    LoginModule,
    DetailedModule,
    ContactsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
