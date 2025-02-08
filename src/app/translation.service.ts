import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('selectedLanguage') || 'en';
      this.translate.setDefaultLang('en');
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }

  switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedLanguage', lang);
    }
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return isPlatformBrowser(this.platformId) &&
      localStorage.getItem('selectedLanguage')
      ? localStorage.getItem('selectedLanguage')!
      : 'en';
  }
}
