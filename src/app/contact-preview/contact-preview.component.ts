import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContactModel } from '../models/contact.model';

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPreviewComponent  {
  @Input() currentContact: ContactModel;
  @Output() unlinkContact: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router) {}

  unlink() {
    this.unlinkContact.emit(true);
  }

  redirectToEdit() {
    this.router.navigate(['details'], { queryParams: { contact: JSON.stringify(this.currentContact) } });
  }

}
