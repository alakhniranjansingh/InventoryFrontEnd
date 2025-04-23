// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class CartItemModule { }


export interface CartItem {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
}
