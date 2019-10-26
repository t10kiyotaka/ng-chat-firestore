import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSliderModule,
  MatSnackBarModule, MatToolbarModule
} from '@angular/material';

const modules = [
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule
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
