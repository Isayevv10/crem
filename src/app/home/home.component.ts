import { Component } from '@angular/core';
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

  listOfMenus: Array<{ title: string; icon?: string }> = [
    { title: 'СРЕДСТВА ДЛЯ ОБУВИ' },
    { title: 'МАТЕРИАЛ' },
    { title: 'НАЗНАЧЕНИЕ' },
    { title: 'НАБОРЫ' },
    { title: 'АКСЕССУАРЫ' },
    { title: 'БРИТЬЕ И УХОД' },
    { title: 'БРЕНДЫ' },
    { title: 'ПОИСК', icon: '../../assets/svg/search.svg' },
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

  getInitalData() {
    this.dbService
      .getUsers()
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
}
