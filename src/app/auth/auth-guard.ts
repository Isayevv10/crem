import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CremService } from '../services/crem.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private cremSerevice: CremService, private route: Router) {}

  canActivate(): boolean {
    if (this.cremSerevice.isAuthenticated()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
