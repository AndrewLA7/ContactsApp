import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry, takeUntil } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { ApiService } from '../services/api.service';
import { CustomValidators } from '../validators/custom.validator';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  submitted = false;
  newContactForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get formControls() {
    return this.newContactForm.controls;
  }

  private initForm() {
    this.newContactForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, CustomValidators.validateCharacters]),
      lastName: new FormControl('', [Validators.required, CustomValidators.validateCharacters]),
      phone: new FormControl('')
    });
  }

  addNewContact() {
    this.submitted = true;
    if (this.newContactForm.invalid) {
      return;
    }
    const currentContact: ContactModel = this.newContactForm.getRawValue();
    this.apiService.addContact(currentContact)
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
