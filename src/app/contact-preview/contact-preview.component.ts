import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit, OnDestroy {
  @Input() currentContact: ContactModel;
  @Output() unlinkContact: EventEmitter<boolean> = new EventEmitter();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  unlink() {
    this.unlinkContact.emit(true);
  }

  redirectToEdit() {
    this.router.navigate(['details'], { queryParams: { contact: JSON.stringify(this.currentContact) } });
  }

}
