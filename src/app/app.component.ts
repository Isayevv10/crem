import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CremService } from './services/crem.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  route = inject(Router);
  cremService = inject(CremService);

  logoutSite() {
    this.cremService.logout();
    this.route.navigate(['/login']);
  }
}
