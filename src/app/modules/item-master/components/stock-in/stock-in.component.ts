import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})


export class StockInComponent implements OnInit {
  items: Item[] = [];

  stockInAmounts: { [itemId: number]: number } = {};

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {

    this.itemService.getItems().subscribe((data) => {
      this.items = data;

    });
  }


  stockIn(itemId: number): void {
    const stockAmount = this.stockInAmounts[itemId];
    if (stockAmount && stockAmount > 0) {
      console.log(`Stocking in ${stockAmount} for item ${itemId}`);

      this.itemService.updateStock(itemId, stockAmount).subscribe({
        next: (response) => {
          console.log('Stock added successfully', response);

          this.stockInAmounts[itemId] = 0;

          this.itemService.getItems().subscribe((data) => {
            this.items = data;
          });
        },

        error: (error) => {
          console.error('Error while adding stock', error);

        }
      });
    } else {
      console.log('Please enter a valid stock amount');
    }
  }
}
