import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactPreviewComponent } from "../contact-preview/contact-preview.component";
import { SharedModule } from "../shared.module";
import { ContactsComponent } from "./contacts.component";
import { ContactsRoutingModule } from "./contacts.routing-module";

@NgModule({
    declarations: [
        ContactsComponent,
        ContactPreviewComponent
    ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        SharedModule,
    ],
    exports: [ContactsComponent]
})
export class ContactsModule {

}