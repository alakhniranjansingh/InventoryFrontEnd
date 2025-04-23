// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { Routes } from '@angular/router';
// import { DashboardComponent } from './modules/item-master/components/dashboard/dashboard.component';
// import { ItemListComponent } from './modules/item-master/components/item-list/item-list.component';
// import { StockInComponent } from './modules/item-master/components/stock-in/stock-in.component';
// import { StockOutComponent } from './modules/item-master/components/stock-out/stock-out.component';
// import { ReportsComponent } from './modules/item-master/components/reports/reports.component';


// export const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'item-master', component: ItemListComponent },
//   { path: 'stock-in', component: StockInComponent },
//   { path: 'stock-out', component: StockOutComponent },
//   { path: 'reports', component: ReportsComponent },
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { Route, provideRouter } from '@angular/router';
import { DashboardComponent } from './modules/item-master/components/dashboard/dashboard.component';
import { ItemListComponent } from './modules/item-master/components/item-list/item-list.component';
import { StockInComponent } from './modules/item-master/components/stock-in/stock-in.component';
import { StockOutComponent } from './modules/item-master/components/stock-out/stock-out.component';
import { CartComponent } from './modules/item-master/components/cart/cart.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';
import { DynamicpaginationComponent } from './modules/item-master/components/dynamicpagination/dynamicpagination.component';
import { TestpageComponent } from './testpage/testpage.component';
// import { ReportsComponent } from './modules/item-master/components/reports/reports.component';

const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'stock-in', component: StockInComponent },
  { path: 'stock-out', component: StockOutComponent },

  {path:'cart',component:CartComponent},
  //  { path: 'stock-history/:id', component: StockHistoryComponent},
   { path: 'stock-history', component: StockHistoryComponent},
   { path: 'pagination', component: DynamicpaginationComponent},
    { path: 'testpage', component: TestpageComponent}
  // { path: 'reports', component: ReportsComponent }
];

export const appConfig = {
  providers: [
    provideRouter(routes),  // Configuring the router with routes
  ]
};
