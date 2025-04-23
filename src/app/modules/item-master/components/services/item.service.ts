// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // export interface Item {
// //   itemId: number;
// //   name: string;
// //   description: string;
// //   category: string;
// //   unit: string;
// //   price: number;
// // }

// // @Injectable({ providedIn: 'root' })
// // export class ItemService {
// //   deleteItem(itemId: number): Observable<any> {
// //     return this.http.delete(`${'https://localhost:7022/api/item'}/${itemId}`);
// //   }
// //   // private apiUrl = 'https://localhost:7022/api/item';
// //   private baseUrl = 'https://localhost:7022/api/item';
// //   // https://localhost:7022
// //   constructor(private http: HttpClient) {}

// //   getItems(): Observable<Item[]> {
// //     return this.http.get<Item[]>(this.baseUrl);
// //   }

// //   addItem(item: Item): Observable<Item> {
// //     return this.http.post<Item>(this.baseUrl, item);
// //   }

// //   updateItem(item: Item): Observable<void> {
// //     return this.http.put<void>(`${this.baseUrl}/${item.itemId}`, item);
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Item {
//   itemId: number;
//   name: string;
//   description: string;
//   category: string;
//   unit: string;
//   price: number;
// }

// @Injectable({ providedIn: 'root' })
// export class ItemService {

//   private baseUrl = 'https://localhost:7022/api/item';
//   private dashboardUrl = 'https://localhost:7022/api/dashboard';
//   constructor(private http: HttpClient) {}

//   getItems(): Observable<Item[]> {
//     return this.http.get<Item[]>(this.baseUrl);
//   }

//   addItem(item: Item): Observable<Item> {
//     return this.http.post<Item>(this.baseUrl, item);
//   }

//   updateItem(item: Item): Observable<void> {
//     return this.http.put<void>(`${this.baseUrl}/${item.itemId}`, item);
//   }

//   deleteItem(itemId: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${itemId}`);
//   }
//   getDashboardData(): Observable<any> {
//     return this.http.get<any>(this.dashboardUrl);  // Fetch data from the correct dashboard API
//   }
//   updateStock(itemId: number, stockAmount: number): Observable<any> {
//     // Assuming you have an API endpoint to handle stock updates
//     return this.http.post(`${this.baseUrl}/stock-in/${itemId}`, { quantity: stockAmount } );
//   }
//   reduceStock(itemId: number, quantity: number): Observable<any> {
//     return this.http.post(`${this.baseUrl}/stock-out/${itemId}`,  { quantity: quantity }
//     );
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  itemId: number;
  name: string;
  description: string;
  category: string;
  unit: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ItemService {

  private baseUrl = 'https://localhost:7043/api/item';
  private BaseUrl = 'https://localhost:7043/api/StockTransactions';
  private dashboardUrl = 'https://localhost:7043/api/dashboard';

  // https://localhost:7043
  // 'https://localhost:7022/api/dashboard';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  updateItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${item.itemId}`, item);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${itemId}`);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.dashboardUrl);
  }

  // Updated stock-in method
  // updateStock(itemId: number, stockAmount: number): Observable<any> {
  //   return this.http.post(`${this.BaseUrl}/stockin/${itemId}`, {  stockAmount });
  // }


  updateStock(itemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.BaseUrl}/stockin/${itemId}`,{ quantity });
  }
  // Updated stock-out method
  reduceStock(itemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.BaseUrl}/stockout/${itemId}`, { quantity });
  }

  reduceStockBulk(items: { itemId: number, quantity: number }[]): Observable<any> {
    return this.http.post(`${this.BaseUrl}/stockout`, items);
  }

  // getPagination(page: number, size: number): Observable<{ data: Item[], totalRecords: number }> {
  //   return this.http.get<{ data: Item[], totalRecords: number }>(
  //     `https://your-api-url/api/items?page=${page}&size=${size}`
  //   );
  // }

  getPagination(page: number, size: number): Observable<{ data: Item[], totalRecords: number }> {
    // Construct the API URL for pagination
    const url = `${this.baseUrl}?page=${page}&size=${size}`;

    // Call the API and return the data with pagination details
    return this.http.get<{ data: Item[], totalRecords: number }>(url);
  }


}
