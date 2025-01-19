import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private currentValueSubject = new BehaviorSubject<{
    param1: any[];
    param2: boolean;
  }>({ param1: [], param2: true });

  originalData = this.currentValueSubject.asObservable();

  sendResults(value: any[], loading: boolean) {
    this.currentValueSubject.next({ param1: value, param2: loading });
  }
}
