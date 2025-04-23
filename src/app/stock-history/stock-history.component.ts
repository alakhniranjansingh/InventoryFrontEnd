import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../modules/item-master/components/services/stock.service';
import * as XLSX from 'xlsx';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { Item, ItemService } from '../modules/item-master/components/services/item.service';


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  imports: [CommonModule, PanelModule, FormsModule, TableModule],
  styleUrls: ['./stock-history.component.css']
  // providers:[jsPDF,autoTable]
})
export class StockHistoryComponent implements OnInit {
  itemId: number = 0;
  transactions: any[] = [];
  // transactions: any[] = [];
  // itemId: number = 0;
  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  items: Item[] = [];

  getItemNameById(id: number): string {
    const item = this.items.find(i => i.itemId === id);
    return item ? item.name : 'N/A';
  }
  


  ngOnInit(): void {
    console.log('Items:', this.items);


    this.itemService.getItems().subscribe((data) => {
      this.items = data;

    });
    console.log('StockHistoryComponent loaded');

    this.route.queryParams.subscribe(params => {
      this.itemId = +params['itemId'] || 0;

      if (this.itemId > 0) {
        console.log('Fetching transactions for itemId:', this.itemId);
        this.loadTransactions(this.itemId);
      } else {
        console.warn('Invalid or missing itemId in query parameters');
      }
    });
  }

  viewTransactions(itemId: number): void {
    this.itemId = itemId;  // Save the itemId if needed for export or display
    this.stockService.getStockHistory(itemId).subscribe({
      next: (data) => {
        console.log('Stock history for itemId:', itemId, data);
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }
  loadTransactions(itemId: number): void {
    this.stockService.getStockHistory(itemId).subscribe({
      next: (data) => {
        console.log('Stock history data received:', data);
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error fetching stock history:', err);
      }
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StockHistory');
    XLSX.writeFile(workbook, `StockHistory_Item_${this.itemId}.xlsx`);
  }





  stockInAmounts: { [itemId: number]: number } = {};

  // constructor(private itemService: ItemService) {}

  // ngOnInit(): void {

  //   this.itemService.getItems().subscribe((data) => {
  //     this.items = data;

  //   });
  // }


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


  exportToPdf(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Stock History - Item ${this.itemId}`, 14, 22);

    const headers = [['Item Name', 'Quantity', 'Type', 'Transaction Date']];

    const data = this.transactions.map(tx => [
      tx.itemName,
      tx.quantity,
      tx.type,
      new Date(tx.transactionDate).toLocaleString()
    ]);

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
    });

    doc.save(`StockHistory_Item_${this.itemId}.pdf`);
  }


}
