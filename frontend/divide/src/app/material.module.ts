import {NgModule} from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  
  MatListModule,
  MatButton,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,MatFormFieldModule
  ]
})
export class MaterialModule {}