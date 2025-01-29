import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FiltrComponent } from '../components/filtr/filtr.component';
import { CremService } from '../services/crem.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { DataSharingService } from '../shared/data-sharing.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    FiltrComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatPaginatorModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private dbService: CremService,
    private sharingService: DataSharingService
  ) {}

  items: any[] = [];
  loading: boolean = true;
  offset: number = 0;
  limit: number = 25;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listOfMenus = [
    { title: 'SHOE PRODUCTS', key: 'shoes_products' },
    { title: 'MATERIAL', key: 'material' },
    { title: 'PURPOSE', key: 'purpose' },
    { title: 'SETS', key: 'sets' },
    { title: 'ACCESSORIES', key: 'accessories' },
    { title: 'SHAVING AND GROOMING', key: 'shaving_grooming' },
    { title: 'BRANDS', key: 'brands' },
    { title: 'SEARCH', icon: '../../assets/svg/search.svg', key: 'search' },
  ];

  ngOnInit(): void {
    this.sharingService.originalData.subscribe((data) => {
      this.items = data.param1;
      this.loading = data.param2;
      console.log(this.loading);
      console.log(this.items);
    });

    this.getInitalData();
  }

  getInitalData(options?: any) {
    const params = options ?? {
      offset: this.offset,
      limit: this.limit,
    };

    this.dbService
      .getUsers(params.offset, params.limit)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        console.log('initial data', data);
        this.items = data;
      });
  }

  onPageEvent(event: PageEvent): void {
    this.getInitalData({
      offset: event.pageSize,
      limit: this.limit,
    });
  }
}
