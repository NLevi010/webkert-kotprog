import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    PlansComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class PlansModule { }
