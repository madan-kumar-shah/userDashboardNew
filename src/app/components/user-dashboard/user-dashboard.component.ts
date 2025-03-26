import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Chart } from "chart.js/auto";
import { Subscription } from "rxjs";
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: "app-user-dashboard",
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <div class="dashboard">
      <div class="header">
        <h1>User Dashboard</h1>
        <button class="btn" (click)="openUserForm()">Add User</button>
      </div>

      <div class="content">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users$ | async; track user.id) {
              <tr>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
              </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="chart-container">
          <canvas #chartCanvas></canvas>
        </div>
      </div>

      @if (showUserForm) {
      <div class="modal">
        @defer {
        <app-user-form
          (userSubmitted)="onUserSubmitted($event)"
          (closeModal)="closeUserForm()"
        />
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 24px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      .chart-container {
        height: 400px;
      }
    `,
  ],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  @ViewChild("chartCanvas") chartCanvas!: ElementRef<HTMLCanvasElement>;

  users$ = this.userService.users$;
  showUserForm = false;
  chart: Chart | null = null;
  private chartSubscription?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    this.chartSubscription?.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart() {
    if (!this.chartCanvas) return;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: ["Admin", "Editor", "Viewer"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.chartSubscription = this.userService.getRoleDistribution().subscribe({
      next: (distribution) => {
        if (!this.chart) return;

        this.chart.data.datasets[0].data = [
          distribution["Admin"] || 0,
          distribution["Editor"] || 0,
          distribution["Viewer"] || 0,
        ];

        this.chart.update();
      },
      error: (error) => {
        console.error("Error updating chart:", error);
      },
    });
  }

  openUserForm() {
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
  }

  onUserSubmitted(user: Omit<User, "id">) {
    this.userService.addUser(user);
    this.closeUserForm();
  }
}
