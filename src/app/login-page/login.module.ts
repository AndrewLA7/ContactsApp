import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { LoginPageComponent } from "./login-page.component";
import { LoginRoutingModule } from "./login.routing-module";

@NgModule({
    declarations: [
        LoginPageComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
    ],
    exports: [LoginPageComponent]
})
export class LoginModule {

}