// import { Component, OnInit } from '@angular/core';
// import { ItemService, Item } from '../services/item.service';
// import { CommonModule } from '@angular/common';
// import { TableModule } from 'primeng/table';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { DropdownModule } from 'primeng/dropdown';
// import { FormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { DialogModule } from 'primeng/dialog';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { PaginatorModule } from 'primeng/paginator';
// import { PanelModule } from 'primeng/panel';
// import { ToastModule } from 'primeng/toast';
// import { trigger, transition, style, animate } from '@angular/animations';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StockService } from '../services/stock.service';
// import * as XLSX from 'xlsx';
// import { CartService } from '../services/cart.service';
// import { CartItem } from '../../Models/cart-item/cart-item.module';


// @Component({
//   selector: 'app-dashboard',
//   imports: [CommonModule, ToastModule, PanelModule, FormsModule, DropdownModule, ConfirmDialogModule, PaginatorModule, TableModule, DialogModule, ReactiveFormsModule],
//   animations: [
//     trigger('panelContent', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('300ms', style({ opacity: 1 }))
//       ]),
//       transition(':leave', [
//         style({ opacity: 1 }),
//         animate('300ms', style({ opacity: 0 }))
//       ])
//     ])
//   ],
//   // styleUrls: ['./item-list.component.css'],
//   providers: [ConfirmationService, MessageService],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })



// export class DashboardComponent implements OnInit {

//  cartItems: CartItem[] = [];

//     items: Item[] = [];
//   itemForm: FormGroup;
//   displayDialog: boolean = false;
//   isEdit: boolean = false;
//   private apiUrl: any = 'https://localhost:7022/api/item';
//   isPanelVisible: any=true;

//   constructor(
//     private itemService: ItemService,
//     private cartService: CartService,
//     private stockService: StockService,
//     private confirmationService: ConfirmationService,
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private route: ActivatedRoute,
//     private confirmation: ConfirmationService,
//     private messageService: MessageService // Injecting MessageService
//   ) {
//     this.itemForm = this.fb.group({
//       itemId: [null],
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       category: ['', Validators.required],
//       unit: ['', Validators.required],
//       price: [null, [Validators.required, Validators.min(0)]],
//     });
//   }

//   itemId: number = 0;
//   transactions: any[] = [];
//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCart();
//     console.log('StockHistoryComponent loaded');

//     this.route.queryParams.subscribe(params => {
//       this.itemId = +params['itemId'] || 0;

//       if (this.itemId > 0) {
//         console.log('Fetching transactions for itemId:', this.itemId);
//         this.loadTransactions(this.itemId);
//       } else {
//         console.warn('Invalid or missing itemId in query parameters');
//       }
//     });
//     this.loadItems();
//     this.itemService.getItems().subscribe((data) => {
//       this.items = data;

//     });


//   }


//   addToCart(item: Item): void {
//     const cartItem: CartItem = {
//       itemId: item.itemId,
//       name: item.name,
//       price: item.price,
//       quantity: 1  // Default quantity
//     };

//     const result = this.cartService.addToCart(cartItem);
//     if (result === 'Added') {
//       this.cartItems = this.cartService.getCart(); // Refresh view
//       this.messageService.add({ severity: 'success', summary: 'Added to Cart', detail: `${item.name} added.` });
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `${item.name} already in cart.` });
//     }
//   }



//   getTotal(): number {
//     return this.cartService.getTotal();
//   }

//   // purchase(): void {
//   //   const payload = {
//   //     items: this.cartItems.map(item => ({
//   //       itemId: item.itemId,
//   //       quantity: item.quantity
//   //     }))
//   //   };

//   //   this.http.post<any>('https://localhost:7043/api/purchase/2', payload)
//   //     .subscribe({
//   //       next: (res) => {
//   //         alert(`Purchase successful! Total: ₹${res.totalAmount}`);
//   //         this.cartService.clearCart();
//   //         this.cartItems = [];
//   //       },
//   //       error: (err) => {
//   //         alert('Error: ' + err.error);
//   //       }
//   //     });
//   // }

//   purchase(): void {
//     const payload = {
//       items: this.cartItems.map(item => ({
//         itemId: item.itemId,
//         quantity: item.quantity
//       }))
//     };

//     this.http.post<any>('https://localhost:7043/api/purchase', payload)
//       .subscribe({
//         next: (res) => {
//           alert(`Purchase successful! Total: ₹${res.totalAmount}`);
//           this.cartService.clearCart();
//           this.cartItems = [];
//         },
//         error: (err) => {
//           alert('Error: ' + err.error);
//         }
//       });
//   }
//   removeFromCart(itemId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
//     this.cartService.clearCart();
//     this.cartItems.forEach(item => this.cartService.addToCart(item)); // Rebuild cart
//   }


//   loadItems() {
//     this.itemService.getItems().subscribe((data) => (this.items = data));
//   }

//   openAddDialog() {
//     this.itemForm.reset();
//     this.isEdit = false;
//     this.displayDialog = true;
//   }

//   openEditDialog(item: Item) {
//     this.itemForm.patchValue(item);
//     this.isEdit = true;
//     this.displayDialog = true;
//   }

//   saveItem() {
//     if (this.itemForm.invalid) {
//       this.itemForm.markAllAsTouched();
//       return;
//     }

//     const item = { ...this.itemForm.value };

//     if (this.isEdit) {
//       this.itemService.updateItem(item).subscribe(
//         () => {
//           this.displayDialog = false;
//           this.loadItems();
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item updated successfully' });
//         },
//         (error) => {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update item' });
//         }
//       );
//     } else {
//       delete item.itemId;
//       this.itemService.addItem(item).subscribe(
//         () => {
//           this.displayDialog = false;
//           this.loadItems();
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added successfully' });
//         },
//         (error) => {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item' });
//         }
//       );
//     }
//   }

//   closeDialog() {
//     this.displayDialog = false;
//   }

//   deleteItem(itemId: number) {
//     this.confirmationService.confirm({
//       message: 'Are you sure you want to delete this item?',
//       header: 'Confirm Deletion',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.itemService.deleteItem(itemId).subscribe(
//           () => {
//             this.loadItems();
//             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
//           },
//           (err) => {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete item' });
//           }
//         );
//       },
//       reject: () => {
//         // Optional: handle cancel
//       },
//     });
//   }
//   allTransactions: any[] = [];


//   // viewTransactions(itemId: number) {
//   //   this.router.navigate(['/stock-history', itemId]);
//   // }

//   viewTransactions(itemId: number): void {
//   this.itemId = itemId;  // Save the itemId if needed for export or display
//   this.stockService.getStockHistory(itemId).subscribe({
//     next: (data) => {
//       console.log('Stock history for itemId:', itemId, data);
//       this.transactions = data;
//     },
//     error: (err) => {
//       console.error('Error loading transactions:', err);
//     }
//   });
// }


//   // items: Item[] = [];

//   stockInAmounts: { [itemId: number]: number } = {};

//   // constructor(private itemService: ItemService) {}




//   stockIn(itemId: number): void {
//     const stockAmount = this.stockInAmounts[itemId];
//     if (stockAmount && stockAmount > 0) {
//       console.log(`Stocking in ${stockAmount} for item ${itemId}`);

//       this.itemService.updateStock(itemId, stockAmount).subscribe({
//         next: (response) => {
//           console.log('Stock added successfully', response);

//           this.stockInAmounts[itemId] = 0;

//           this.itemService.getItems().subscribe((data) => {
//             this.items = data;
//           });
//         },

//         error: (error) => {
//           console.error('Error while adding stock', error);

//         }
//       });
//     } else {
//       console.log('Please enter a valid stock amount');
//     }
//   }






//   // items: Item[] = [];

//   // ✅ Use a map to track stockOut amount per itemId
//   stockOutAmounts: { [itemId: number]: number } = {};

//   // constructor(private itemService: ItemService) {}

//   // ngOnInit(): void {
//   //   this.itemService.getItems().subscribe((data) => {
//   //     this.items = data;
//   //   });
//   // }

//   stockOut(itemId: number): void {
//     const stockAmount = this.stockOutAmounts[itemId];
//     if (stockAmount && stockAmount > 0) {
//       console.log(`Stocking out ${stockAmount} for item ${itemId}`);

//       this.itemService.reduceStock(itemId, stockAmount).subscribe({
//         next: (response) => {
//           console.log('Stock reduced successfully', response);

//           // Optionally reset the input
//           this.stockOutAmounts[itemId] = 0;

//           // Optionally reload items if unit values are dynamic
//           this.itemService.getItems().subscribe((data) => {
//             this.items = data;
//           });
//         },
//         error: (error) => {
//           console.error('Error while reducing stock', error);
//         }
//       });
//     } else {
//       console.log('Please enter a valid stock amount to remove');
//     }
//   }



//     loadTransactions(itemId: number): void {
//       this.stockService.getStockHistory(itemId).subscribe({
//         next: (data) => {
//           console.log('Stock history data received:', data);
//           this.transactions = data;
//         },
//         error: (err) => {
//           console.error('Error fetching stock history:', err);
//         }
//       });
//     }

//     exportToExcel(): void {
//       const worksheet = XLSX.utils.json_to_sheet(this.transactions);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'StockHistory');
//       XLSX.writeFile(workbook, `StockHistory_Item_${this.itemId}.xlsx`);
//     }
// }



import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../services/stock.service';
import * as XLSX from 'xlsx';
import { CartService } from '../services/cart.service';
import { CartItem } from '../../Models/cart-item/cart-item.module';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,AccordionModule, ToastModule, PanelModule, FormsModule, DropdownModule, ConfirmDialogModule, PaginatorModule, TableModule, DialogModule, ReactiveFormsModule],
  animations: [
    trigger('panelContent', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  cartItems: CartItem[] = [];
  cartQuantities: { [key: number]: number } = {};  // Initialize cartQuantities

  items: Item[] = [];
  itemForm: FormGroup;
  displayDialog: boolean = false;
  isEdit: boolean = false;
  private apiUrl: any = 'https://localhost:7022/api/item';
  isPanelVisible: any = true;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private stockService: StockService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private messageService: MessageService // Injecting MessageService
  ) {
    this.itemForm = this.fb.group({
      itemId: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      unit: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  itemId: number = 0;
  transactions: any[] = [];

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
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

    this.loadItems();
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  addToCart(item: Item, quantity: number): void {
    if (quantity > 0) {
      const cartItem: CartItem = {
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: quantity // Use the quantity passed from ngModel
      };

      const result = this.cartService.addToCart(cartItem);
      if (result === 'Added') {
        this.cartItems = this.cartService.getCart(); // Refresh view
        this.messageService.add({ severity: 'success', summary: 'Added to Cart', detail: `${item.name} added.` });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `${item.name} already in cart.` });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Quantity', detail: 'Quantity must be greater than zero.' });
    }
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  purchase(): void {
    const payload = {
      items: this.cartItems.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }))
    };

    this.http.post<any>('https://localhost:7043/api/purchase', payload)
      .subscribe({
        next: (res) => {
          alert(`Purchase successful! Total: ₹${res.totalAmount}`);
          this.cartService.clearCart();
          this.cartItems = [];
        },
        error: (err) => {
          alert('Error: ' + err.error);
        }
      });
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
    this.cartService.clearCart();
    this.cartItems.forEach(item => this.cartService.addToCart(item)); // Rebuild cart
  }

  loadItems() {
    this.itemService.getItems().subscribe((data) => (this.items = data));
  }

  openAddDialog() {
    this.itemForm.reset();
    this.isEdit = false;
    this.displayDialog = true;
  }

  openEditDialog(item: Item) {
    this.itemForm.patchValue(item);
    this.isEdit = true;
    this.displayDialog = true;
  }

  saveItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const item = { ...this.itemForm.value };

    if (this.isEdit) {
      this.itemService.updateItem(item).subscribe(
        () => {
          this.displayDialog = false;
          this.loadItems();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item updated successfully' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update item' });
        }
      );
    } else {
      delete item.itemId;
      this.itemService.addItem(item).subscribe(
        () => {
          this.displayDialog = false;
          this.loadItems();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added successfully' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add item' });
        }
      );
    }
  }

  closeDialog() {
    this.displayDialog = false;
  }

  deleteItem(itemId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService.deleteItem(itemId).subscribe(
          () => {
            this.loadItems();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete item' });
          }
        );
      },
      reject: () => {
        // Optional: handle cancel
      },
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

  stockInAmounts: { [itemId: number]: number } = {};

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

  stockOutAmounts: { [itemId: number]: number } = {};

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
}
