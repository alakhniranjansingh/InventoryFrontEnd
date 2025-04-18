import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './modules/item-master/components/item-list/item-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'item-master', component: ItemListComponent },
  { path: '', redirectTo: '/item-master', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
