import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailedInfoComponent } from "./detailed-info.component";

const routes: Routes = [
    {
        path: '',
        component: DetailedInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailedRoutingModule {
}
