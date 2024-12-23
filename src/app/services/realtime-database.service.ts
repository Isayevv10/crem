import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  constructor(private db: Database) {}

  // Fetch all items as an observable
  getItems(): Observable<any[]> {
    return new Observable((observer) => {
      const itemsRef = ref(this.db, 'users');
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const items = data ? data : [];
        observer.next(items);
      });
    });
  }
}
