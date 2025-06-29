// users/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { UserAuth } from '../model/UserAuth';
import { Authentication } from '../model/Authentication';
import { UserDTO } from '../model/UserDTO';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  authenticateUser(user: UserAuth): Observable<Authentication> {
    return this.api.post<Authentication>('account/login', user);
  }

  getUserByEmail(user: {UserName: string}): Observable<UserDTO> {
    return this.api.post<UserDTO>('users/GetUserByEmail', user);
  }

  fetchAllUsers(customerId: number): Observable<User[]> {
    return this.api.get<User[]>('users/FetchAllUsers/' + customerId);
  }
}