import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FiltrComponent } from '../components/filtr/filtr.component';
import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatGridListModule, FiltrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private dbService: RealtimeDatabaseService) {}

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

  ngOnInit(): void {
    this.dbService.getItems().subscribe((data) => {
      this.items = data;
    });
  }
}
