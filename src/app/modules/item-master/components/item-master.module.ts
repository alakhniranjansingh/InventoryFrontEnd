import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, TableModule,HttpClientModule],
  exports: []
})
export class ItemMasterModule {}
