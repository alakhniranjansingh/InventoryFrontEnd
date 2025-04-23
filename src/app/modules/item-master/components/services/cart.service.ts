// import { CartItem } from './../../Models/cart-item/cart-item.module';
import { Injectable } from '@angular/core';
import { CartItem } from './../../Models/cart-item/cart-item.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  constructor(private http:HttpClient) {}
  getCart(): CartItem[] {
    return [...this.cart];
  }

  addToCart(item: CartItem): string {
    const existing = this.cart.find(c => c.itemId === item.itemId);
    if (existing) {
      return 'Item already in cart';
    }
    this.cart.push({ ...item });
    return 'Added';
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }
  private BaseUrl = 'https://localhost:7043/api/StockTransactions';
  reduceStock(itemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.BaseUrl}/stockout/${itemId}`, {
      quantity: quantity
    });
  }

}
