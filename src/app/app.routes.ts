import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './services/resolver.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('../app/components/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    resolve: {
      product: ResolverService,
    },
  },
];
