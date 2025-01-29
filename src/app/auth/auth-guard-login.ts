import { inject, Injectable } from '@angular/core';
import { CremService } from '../services/crem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLoginService {
  cremService = inject(CremService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  canActivate(): boolean {
    if (this.cremService.isAuthenticated()) {
      this.router.navigate([], { relativeTo: this.activatedRoute });
      return false;
    } else {
      return true;
    }
  }
}
