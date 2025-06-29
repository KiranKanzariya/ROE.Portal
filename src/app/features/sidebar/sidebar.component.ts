import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  navigateTo?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private readonly router = inject(Router);

  readonly menuItems: MenuItem[] = [
    {
      icon: 'fa-solid fa-user',
      label: 'Users',
      navigateTo: '/users'
    },
    // {
    //   icon: 'fas fa-home',
    //   label: 'Dashboard',
    //   isOpen: false,
    //   children: [
    //     { icon: 'fas fa-chart-pie', label: 'Analytics' },
    //     { icon: 'fas fa-tasks', label: 'Projects' },
    //   ]
    // },
    // {
    //   icon: 'fas fa-cog',
    //   label: 'Settings',
    //   isOpen: false,
    //   children: [
    //     { icon: 'fas fa-user', label: 'Profile' },
    //     { icon: 'fas fa-lock', label: 'Security' },
    //   ]
    // },
    // {
    //   icon: 'fas fa-envelope',
    //   label: 'Messages'
    // }
  ];

  toggleMenuItem(item: MenuItem): void {
    if (item.children?.length) {
      item.isOpen = !item.isOpen;
    }
  }
}
