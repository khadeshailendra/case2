import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UprogressHomeComponent } from './uprogress-home/uprogress-home.component';
import { Routes, RouterModule } from '@angular/router';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { FormsModule } from '@angular/forms';

const route:Routes=[
  {path:"",component: UprogressHomeComponent},
  {path:"activity",component: DailyActivityComponent},
]


@NgModule({
  declarations: [UprogressHomeComponent, DailyActivityComponent],
  imports: [
    CommonModule,RouterModule.forChild(route),FormsModule
  ]
})
export class UserProgressModule { }
