import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatSliderModule,
  MatSnackBarModule, MatToolbarModule
} from '@angular/material';

const modules = [
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatToolbarModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})

export class MatModule {}
