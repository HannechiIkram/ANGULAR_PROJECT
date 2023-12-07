import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getRole(); // Replace with the method to retrieve the user's role from your AuthService
    console.log(userRole)
    if (userRole == "ROLE_USER") {
      return true; // Allow access to the route
    } else {
        console.log("error")
        this.router.navigate(['/authentication/login']);
      return false; // Block access to the route
    }
  }
}
