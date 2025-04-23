// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class StockService {

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StockTransaction {
  stockTransactionId?: number;
  itemId: number;
  quantity: number;
  type: 'StockIn' | 'StockOut';
  transactionDate?: Date;
  remarks?: string;
  itemName?: string; // Optional for UI
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  testApiCall(): void {
    this.http.get('https://localhost:7043/api/StockTransactions/history/1').subscribe({
      next: (data) => {
        console.log('API Test Response:', data);
      },
      error: (err) => {
        console.error('API Test Error:', err);
      }
    });
  }


  private apiUrl ='https://localhost:7043/api/StockTransactions';
  private BaseUrl = 'https://localhost:7043/api/StockTransactions/history';
  constructor(private http: HttpClient) {}


  getInwardTransactions(itemId: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7043/api/StockTransactions/inward-transactions/${itemId}');
  }

  getOutwardTransactions(itemId: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7043/api/StockTransactions/outward-transactions/${itemId}');
  }

  getStockHistory(itemId: number): Observable<any[]> {
    // console.log('Fetching stock history for itemId:', itemId);
    return this.http.get<any[]>(`${this.BaseUrl}/${itemId}`);

  }

}
