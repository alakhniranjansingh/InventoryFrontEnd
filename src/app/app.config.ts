import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// import { ApplicationConfig } from '@angular/core';
import { provideRouter, Route } from '@angular/router';

import { DashboardComponent } from './modules/item-master/components/dashboard/dashboard.component';
import { StockInComponent } from './modules/item-master/components/stock-in/stock-in.component';
import { StockOutComponent } from './modules/item-master/components/stock-out/stock-out.component';
// import { ReportsComponent } from './modules/item-master/components/reports/reports.component';
import { ItemListComponent } from './modules/item-master/components/item-list/item-list.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';
import { CartComponent } from './modules/item-master/components/cart/cart.component';
import { DynamicpaginationComponent } from './modules/item-master/components/dynamicpagination/dynamicpagination.component';
import { TestpageComponent } from './testpage/testpage.component';


const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'stock-in', component: StockInComponent },
  { path: 'stock-out', component: StockOutComponent },
  // { path: 'stock-history/:id', component: StockHistoryComponent},
  { path: 'stock-history', component: StockHistoryComponent},
   {path:'cart',component:CartComponent},
    { path: 'pagination', component: DynamicpaginationComponent},
    { path: 'testpage', component: TestpageComponent}
  // { path: 'reports', component: ReportsComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [  provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
