import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CremService } from './crem.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  constructor(private dataService: CremService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.dataService.getProductById(id);
  }
}
