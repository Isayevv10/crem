import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang() || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(browserLang);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}
