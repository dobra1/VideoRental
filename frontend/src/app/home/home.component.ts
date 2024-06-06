import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logoutModalOpen: boolean = false;

  constructor(private router: Router) { }

  openLogoutModal() {
    this.logoutModalOpen = true;
  }

  closeLogoutModal() {
    this.logoutModalOpen = false;
  }

  confirmLogout() {
    console.log('Kijelentkezés végrehajtva.');
    this.closeLogoutModal();
    this.router.navigate(['/']);
  }
}
