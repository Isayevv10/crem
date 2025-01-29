import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './services/resolver.service';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './auth/auth-guard';
import { AuthGuardLoginService } from './auth/auth-guard-login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLoginService],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
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
  {
    path: '**',
    redirectTo: 'login',
  },
];
