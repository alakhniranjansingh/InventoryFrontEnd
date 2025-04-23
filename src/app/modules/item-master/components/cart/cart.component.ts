// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-cart',
// //   imports: [],
// //   templateUrl: './cart.component.html',
// //   styleUrl: './cart.component.css'
// // })



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CartService } from '../services/cart.service';
// import { CartItem } from '../../Models/cart-item/cart-item.module';
// import { CommonModule } from '@angular/common';
// import { Item,ItemService } from '../services/item.service';
// import { MessageService } from 'primeng/api';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-cart',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })
// export class CartComponent implements OnInit {
//   cartItems: CartItem[] = [];
//   items: Item[] = [];

//   // cartItems: CartItem[] = [];
//   cartQuantities: { [key: number]: number } = {};
//   constructor(private cartService: CartService, private messageService: MessageService ,private itemService: ItemService, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCart();
//     // this.cartItems = this.cartService.getCart();
//     this.itemService.getItems().subscribe((data) => {
//       this.items = data;

//     });
//   }

//   // getTotal(): number {
//   //   return this.cartService.getTotal();
//   // }

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





//   addToCart(item: Item, quantity: number): void {
//     if (quantity > 0) {
//       const cartItem: CartItem = {
//         itemId: item.itemId,
//         name: item.name,
//         price: item.price,
//         quantity: quantity // Use the quantity passed from ngModel
//       };

//       const result = this.cartService.addToCart(cartItem);
//       if (result === 'Added') {

//         this.cartItems = this.cartService.getCart(); // Refresh view
//         this.cartQuantities[item.itemId] = 0;
//         this.messageService.add({ severity: 'success', summary: 'Added to Cart', detail: `${item.name} added.` });
//       } else {
//         this.messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `${item.name} already in cart.` });
//       }
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'Invalid Quantity', detail: 'Quantity must be greater than zero.' });
//     }
//   }

//   performStockOut(items: any[]): void {
//     this.http.post<any>('https://localhost:7043/api/StockTransactions/stockout', { items })
//       .subscribe({
//         next: () => console.log("Stock-out updated."),
//         error: err => console.error("Stock-out error", err)
//       });
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

//   //   // https://localhost:7043/api/StockTransactions

//   //   this.http.post<any>('https://localhost:7043/api/purchase', payload)
//   //     .subscribe({
//   //       next: (res) => {
//   //         alert(`Purchase successful! Total: ₹${res.totalAmount}`);
//   //         this.performStockOut(payload.items);
//   //         this.cartService.clearCart();
//   //         this.cartItems = [];
//   //         this.cartQuantities = {};
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

//     this.http.post<any>('https://localhost:7043/api/purchase', payload).subscribe({
//       next: (res) => {
//         // After successful purchase, reduce stock for each item
//         this.cartItems.forEach(item => {
//           this.itemService.reduceStock(item.itemId, item.quantity).subscribe({
//             next: () => {
//               console.log(`Stock reduced for item ID: ${item.itemId}`);
//             },
//             error: (err) => {
//               console.error(`Failed to reduce stock for item ID: ${item.itemId}`, err);
//             }
//           });
//         });

//         alert(`Purchase successful! Total: ₹${res.totalAmount}`);
//         this.cartService.clearCart();
//         this.cartItems = [];
//       },
//       error: (err) => {
//         alert('Error: ' + err.error);
//       }
//     });
//   }


//   removeFromCart(itemId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
//     this.cartService.clearCart();
//     this.cartItems.forEach(item => this.cartService.addToCart(item)); // Rebuild cart
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CartService } from '../services/cart.service';
// import { CartItem } from '../../Models/cart-item/cart-item.module';
// import { CommonModule } from '@angular/common';
// import { Item, ItemService } from '../services/item.service';
// import { MessageService } from 'primeng/api';
// import { FormsModule } from '@angular/forms';
// import { ToastModule } from 'primeng/toast';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, FormsModule,ToastModule],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css',
//   providers: [MessageService]
// })
// export class CartComponent implements OnInit {
//   cartItems: CartItem[] = [];
//   items: Item[] = [];
//   cartQuantities: { [key: number]: number } = {};

//   constructor(
//     private cartService: CartService,
//     private messageService: MessageService,
//     private itemService: ItemService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCart();
//     this.itemService.getItems().subscribe(data => {
//       this.items = data;
//     });
//   }

//   addToCart(item: Item, quantity: number): void {
//     if (quantity > 0) {
//       const cartItem: CartItem = {
//         itemId: item.itemId,
//         name: item.name,
//         price: item.price,
//         quantity: quantity
//       };

//       const result = this.cartService.addToCart(cartItem);
//       if (result === 'Added') {
//         this.cartItems = this.cartService.getCart();
//         this.cartQuantities[item.itemId] = 0;
//         this.messageService.add({
//           severity: 'success',
//           summary: 'Added to Cart',
//           detail: `${item.name} added.`
//         });
//       } else {
//         this.messageService.add({
//           severity: 'warn',
//           summary: 'Duplicate',
//           detail: `${item.name} already in cart.`
//         });
//       }
//     } else {
//       this.messageService.add({
//         severity: 'warn',
//         summary: 'Invalid Quantity',
//         detail: 'Quantity must be greater than zero.'
//       });
//     }
//   }

//   purchase(): void {
//     const payload = {
//       items: this.cartItems.map(item => ({
//         itemId: item.itemId,
//         quantity: item.quantity
//       }))
//     };

//     this.http.post<any>('https://localhost:7043/api/purchase', payload).subscribe({
//       next: (res) => {
//         alert(`Purchase successful! Total: ₹${res.totalAmount}`);
//         this.cartService.clearCart();
//         this.cartItems = this.cartService.getCart(); // refresh view
//         this.cartQuantities = {}; // reset inputs
//         // Optionally reload item list to reflect new stock
//         this.itemService.getItems().subscribe(data => {
//           this.items = data;
//         });
//       },
//       error: (err) => {
//         alert('Error: ' + err.error);
//       }
//     });
//   }

//   getTotal(): number {
//     return this.cartService.getTotal();
//   }

//   removeFromCart(itemId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
//     this.cartService.clearCart();
//     this.cartItems.forEach(item => this.cartService.addToCart(item)); // Rebuild cart
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { CartItem } from '../../Models/cart-item/cart-item.module';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../services/item.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DynamicpaginationComponent } from "../dynamicpagination/dynamicpagination.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, DynamicpaginationComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [MessageService] // make sure MessageService is provided
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  items: Item[] = [];
  cartQuantities: { [key: number]: number } = {};

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private itemService: ItemService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addToCart(item: Item, quantity: number): void {
    if (quantity > 0) {
      const cartItem: CartItem = {
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: quantity
      };

      const result = this.cartService.addToCart(cartItem);
      if (result === 'Added') {
        this.cartItems = this.cartService.getCart();
        this.cartQuantities[item.itemId] = 0;
        this.messageService.add({
          severity: 'success',
          summary: 'Added to Cart',
          detail: `${item.name} added.`
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Duplicate',
          detail: `${item.name} already in cart.`
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Quantity',
        detail: 'Quantity must be greater than zero.'
      });
    }
  }

  purchase(): void {
    const payload = {
      items: this.cartItems.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }))
    };

    this.http.post<any>('https://localhost:7043/api/purchase', payload).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Purchase Successful',
          detail: `Total: ₹${res.totalAmount}`
        });
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCart();
        this.cartQuantities = {};

        // Optionally reload item list
        this.itemService.getItems().subscribe(data => {
          this.items = data;
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Purchase Failed',
          detail: err.error || 'Unknown error'
        });
      }
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeFromCart(itemId: number): void {
    const itemToRemove = this.cartItems.find(item => item.itemId === itemId);
    this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
    this.cartService.clearCart();
    this.cartItems.forEach(item => this.cartService.addToCart(item));

    if (itemToRemove) {
      this.messageService.add({
        severity: 'info',
        summary: 'Removed from Cart',
        detail: `${itemToRemove.name} removed.`
      });
    }
  }
}
