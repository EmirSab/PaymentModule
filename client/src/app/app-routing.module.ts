import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

// 10.108 Add routes for components -> home.module.ts
// 10.113 Copy routes shop and shop id -> shop-routing.module.ts
//11.116.1 Add routes for errors ->nav-bar.html
// 11.117.1 Add routes for errors -> interceptors/error.interceptor.ts
// 12.125.3 Add routes for breadcrumbs on error routes ->shop-routing.module.ts
// 14.144 Create basket module, basket-routing, basket-service 
// and basket component Add basket routes -> basket-routing.module
const routes: Routes = [
  {path: '', component: HomeComponent,  data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)
  , data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)
  , data: {breadcrumb: 'Basket'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
