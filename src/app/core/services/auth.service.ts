import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Check if the user is logged in (example using session storage)
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user_auth_token'); // Check for a token
  }
}
