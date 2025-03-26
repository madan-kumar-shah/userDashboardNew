import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { UserDashboardComponent } from './app/components/user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDashboardComponent],
  template: `
    <app-user-dashboard></app-user-dashboard>
  `
})
export class App {}

bootstrapApplication(App);