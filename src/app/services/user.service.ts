import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';

type RoleDistribution = Record<User['role'], number>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  addUser(user: Omit<User, 'id'>): void {
    try {
      const newUser = {
        ...user,
        id: crypto.randomUUID()
      };
      
      const currentUsers = this.users.getValue();
      this.users.next([...currentUsers, newUser]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }

  getRoleDistribution(): Observable<RoleDistribution> {
    return this.users$.pipe(
      map(users => {
        const distribution: Partial<RoleDistribution> = {};
        
        users.forEach(user => {
          distribution[user.role] = (distribution[user.role] || 0) + 1;
        });

        return {
          Admin: distribution.Admin || 0,
          Editor: distribution.Editor || 0,
          Viewer: distribution.Viewer || 0
        };
      })
    );
  }
}