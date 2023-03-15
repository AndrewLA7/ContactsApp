import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { ApiService } from '../services/api.service';
import { CustomValidators } from '../validators/custom.validator';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedInfoComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();
  
  currentContact: ContactModel;

  detailedInfoForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  get formControls() {
    return this.detailedInfoForm.controls;
  }

  ngOnInit() {
    this.initForm();
    this.route.queryParams
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(data => {
      if (data.contact) {
        this.currentContact = JSON.parse(data.contact);
        this.detailedInfoForm.patchValue(this.currentContact);
      }
    });
  }

  private initForm() {
    this.detailedInfoForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, CustomValidators.validateCharacters]),
      lastName: new FormControl('', [Validators.required, CustomValidators.validateCharacters]),
      phone: new FormControl('')
    });
  }

  deleteContact() {
    const result = window.confirm(
      'Do you really want to delete this contact from your contacts list?'
    );
    if (result && this.currentContact) {
      this.apiService.deleteContact(this.currentContact)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.navigateToContactPage()
      });
    }
  }

  saveContact() {
    if (this.detailedInfoForm.invalid) {
      return;
    }

    const contactInfo: ContactModel = { ...this.detailedInfoForm.getRawValue(), userId: this.currentContact.userId, id: this.currentContact.id };

    this.apiService.editContact(contactInfo)
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(() => {
      this.navigateToContactPage()
    });
  }

  navigateToContactPage() {
    this.router.navigate(['contacts']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
