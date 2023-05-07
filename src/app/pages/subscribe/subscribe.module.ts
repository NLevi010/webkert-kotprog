import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribeRoutingModule } from './subscribe-routing.module';
import { SubscribeComponent } from './subscribe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SubscribeComponent
  ],
  imports: [
    CommonModule,
    SubscribeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class SubscribeModule { }
