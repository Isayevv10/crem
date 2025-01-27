import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CremService } from './services/crem.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './translation.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    TranslateModule,
    UpperCasePipe,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  route = inject(Router);
  cremService = inject(CremService);
  supportedLanguages: string[] = ['en', 'ru'];
  selectedLanguage: string;

  constructor(private translationService: TranslationService) {
    this.selectedLanguage = this.translationService.getCurrentLanguage();
  }
  ngOnInit() {
    this.translationService.switchLanguage(this.selectedLanguage);
  }

  logoutSite() {
    this.cremService.logout();
    this.route.navigate(['/login']);
  }

  onLanguageChange(lang: any): void {
    this.translationService.switchLanguage(lang);
    // this.selectedLanguage = lang;
  }
}
