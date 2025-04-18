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
//   deleteItem(itemId: number): Observable<any> {
//     return this.http.delete(`${'https://localhost:7022/api/item'}/${itemId}`);
//   }
//   // private apiUrl = 'https://localhost:7022/api/item';
//   private baseUrl = 'https://localhost:7022/api/item';
//   // https://localhost:7022
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
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  itemId: number;
  name: string;
  description: string;
  category: string;
  unit: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private baseUrl = 'https://localhost:7022/api/item';

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
}

