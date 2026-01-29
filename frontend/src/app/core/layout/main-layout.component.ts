import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
