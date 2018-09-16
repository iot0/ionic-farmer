import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from './ratings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RatingsComponent],
  exports:[RatingsComponent]
})
export class RatingsModule { }
