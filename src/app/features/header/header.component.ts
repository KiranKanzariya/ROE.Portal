import { Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';

import { SessionstorageService } from '../../core/services/sessionstorage.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly isSidebarCollapsed = signal<boolean>(false);
  readonly sidebarCollapsed = output<boolean>();

  private readonly sessionStorage = inject(SessionstorageService);
  private readonly router = inject(Router);

  onSidebarToggle() {
    const newState = this.isSidebarCollapsed();
    this.isSidebarCollapsed.set(!newState);
    this.sidebarCollapsed.emit(this.isSidebarCollapsed());
  }
  
  onSignOut() {
    this.sessionStorage.removeItem('user_auth_token');
    this.router.navigate(['/login']);
  }
}
