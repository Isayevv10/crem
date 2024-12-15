import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FiltrComponent } from '../components/filtr/filtr.component';
// import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatGridListModule, FiltrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}

  items: any[] = [];

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

  // getItems() {
  //   this.dbService
  //     .getItems('users') // Path to your Firebase Realtime Database
  //     .then((data) => {
  //       if (data) {
  //         // If data exists, assign it to the items array
  //         this.items = Object.keys(data).map((key) => data[key]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching items:', error);
  //     });
  // }
}
