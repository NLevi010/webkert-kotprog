import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class SubscriptionsModule { }
