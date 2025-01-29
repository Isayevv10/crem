import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CremService } from '../../services/crem.service';
import { debounceTime, finalize, Subject } from 'rxjs';
import { DataSharingService } from '../../shared/data-sharing.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filtr',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    TranslateModule,
  ],
  templateUrl: './filtr.component.html',
  styleUrl: './filtr.component.scss',
})
export class FiltrComponent {
  minValue: number = 5;
  maxValue: number = 250;
  loading: boolean = true;
  items: any[] = [];
  private rangeChangeSubject = new Subject<void>();

  constructor(
    private dbService: CremService,
    private sharingService: DataSharingService
  ) {}

  ngOnInit() {
    this.rangeChangeSubject.pipe(debounceTime(2000)).subscribe(() => {
      this.searchByPrice();
    });
  }
  ngOnDestroy() {
    this.rangeChangeSubject.complete();
  }
  rangeValueInputs(event: number, type: string): void {
    if (type === 'minValue') {
      this.minValue = event;
    } else {
      this.maxValue = event;
    }

    this.rangeChangeSubject.next();
  }
  searchByPrice(): void {
    this.loading = true;
    this.sharingService.sendResults([], this.loading);
    this.dbService
      .searchByPriceRange(this.minValue, this.maxValue)
      .pipe(
        finalize(
          () => (
            (this.loading = false),
            this.sharingService.sendResults(this.items, this.loading)
          )
        )
      )
      .subscribe((results) => {
        this.items = results;
        this.sharingService.sendResults([], this.loading);
      });
  }
}
