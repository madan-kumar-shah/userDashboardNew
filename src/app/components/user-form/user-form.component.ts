import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

type UserFormData = Omit<User, 'id'>;
type UserRole = User['role'];

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-content">
      <h2>Add New User</h2>
      
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            formControlName="name"
            placeholder="Enter name"
          >
          @if (userForm.get('name')?.errors?.['required'] && userForm.get('name')?.touched) {
            <div class="error">Name is required</div>
          }
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            class="form-control"
            formControlName="email"
            placeholder="Enter email"
          >
          @if (userForm.get('email')?.errors?.['required'] && userForm.get('email')?.touched) {
            <div class="error">Email is required</div>
          }
          @if (userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched) {
            <div class="error">Please enter a valid email</div>
          }
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select
            id="role"
            class="form-control"
            formControlName="role"
          >
            <option value="">Select role</option>
            @for (role of availableRoles; track role) {
              <option [value]="role">{{ role }}</option>
            }
          </select>
          @if (userForm.get('role')?.errors?.['required'] && userForm.get('role')?.touched) {
            <div class="error">Role is required</div>
          }
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="onClose()">Cancel</button>
          <button type="submit" class="btn" [disabled]="userForm.invalid">Add User</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--secondary-color);
    }

    .error {
      color: red;
      font-size: 14px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }

    .btn-secondary {
      background-color: #6c757d;
    }
  `]
})
export class UserFormComponent {
  @Output() userSubmitted = new EventEmitter<UserFormData>();
  @Output() closeModal = new EventEmitter<void>();

  userForm: FormGroup;
  availableRoles: UserRole[] = ['Admin', 'Editor', 'Viewer'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value as UserFormData;
      this.userSubmitted.emit(formData);
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}