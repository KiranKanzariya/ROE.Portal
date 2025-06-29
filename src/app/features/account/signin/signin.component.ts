import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../core/services/localstorage.service';
import { SessionstorageService } from '../../../core/services/sessionstorage.service';
import { UserService } from '../../../core/services/user.service';
import { NgIf } from '@angular/common';


const USERNAME_PATTERN = /^(?=.{1,25}$)[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+@ROE$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{12,20}$/;

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly sessionstorageService = inject(SessionstorageService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  isError = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  signInForm = new FormGroup({
    userName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(USERNAME_PATTERN)
      ],
      updateOn: 'blur'
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ],
      updateOn: 'blur'
    }),
    remeberMe: new FormControl(false)
  });

  ngOnInit(): void {
    this.errorMessage.set('Login failed. Please check your username and password.');
    const user = this.localStorageService.getItem<{ userName: string; password: string }>('user_auth');
    if (user) {
      this.signInForm.patchValue({
        userName: user.userName ?? '',
        password: user.password ?? ''
      });
    }
  }

  onSubmit() {
    this.isLoading.set(true);
    const userName = this.signInForm.get('userName')?.value?.trim();
    const password = this.signInForm.get('password')?.value?.trim();
    const rememberMe = this.signInForm.get('remeberMe')?.value;

    if (!!userName && !!password) {
      const subscription = this.userService.authenticateUser({ UserName: userName, Password: password }).subscribe({
        next: (token) => {
          if (token) {
            this.sessionstorageService.setItem('user_auth_token', token.accessToken);
            const userSubscription = this.userService.getUserByEmail({ UserName: userName }).subscribe({
              next: (data) => {
                this.sessionstorageService.setItem('user_info', data);

                if (!!rememberMe) {
                  this.localStorageService.setItem('user_auth', { userName: userName, password: password });
                } else {
                  this.localStorageService.removeItem('user_auth');
                }

                this.router.navigate(['/']);
              },
              error: (err) => {
                this.isLoading.set(false);
                this.sessionstorageService.removeItem('user_auth_token');
                if (!this.isError()) {
                  this.isError.set(true);
                }
              }
            });
            this.destroyRef.onDestroy(() => userSubscription);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status == 403) {
            if (err.error?.message == 'user_not_active') {
              this.errorMessage.set('Your account is currently inactive. Please contact an administrator to reactivate it.');
            }
            else if (err.error?.message == 'user_not_apprve_by_admin') {
              this.errorMessage.set('Your account has not been approved by an administrator. Please contact an administrator to proceed.');
            }
          }
          if (!this.isError()) {
            this.isError.set(true);
          }
        }
      });

      this.destroyRef.onDestroy(() => subscription);
    }
  }
}
