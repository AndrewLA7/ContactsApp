import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { DetailedInfoComponent } from "./detailed-info.component";
import { DetailedRoutingModule } from "./detailed.routing-module";

@NgModule({
    declarations: [
        DetailedInfoComponent
    ],
    imports: [
        CommonModule,
        DetailedRoutingModule,
        SharedModule,
    ],
    exports: [DetailedInfoComponent]
})
export class DetailedModule {

}