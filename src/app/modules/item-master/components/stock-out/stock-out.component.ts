import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicpaginationComponent } from "../dynamicpagination/dynamicpagination.component";

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [FormsModule, CommonModule, DynamicpaginationComponent],
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.css']
})


export class StockOutComponent implements OnInit {
  items: Item[] = [];

  // ✅ Use a map to track stockOut amount per itemId
  stockOutAmounts: { [itemId: number]: number } = {};

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  stockOut(itemId: number): void {
    const stockAmount = this.stockOutAmounts[itemId];
    if (stockAmount && stockAmount > 0) {
      console.log(`Stocking out ${stockAmount} for item ${itemId}`);

      this.itemService.reduceStock(itemId, stockAmount).subscribe({
        next: (response) => {
          console.log('Stock reduced successfully', response);

          // Optionally reset the input
          this.stockOutAmounts[itemId] = 0;

          // Optionally reload items if unit values are dynamic
          this.itemService.getItems().subscribe((data) => {
            this.items = data;
          });
        },
        error: (error) => {
          console.error('Error while reducing stock', error);
        }
      });
    } else {
      console.log('Please enter a valid stock amount to remove');
    }
  }
}
