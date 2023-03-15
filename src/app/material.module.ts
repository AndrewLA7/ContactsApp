import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

const modules = [
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {

}