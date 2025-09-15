import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-place-order',
  imports: [CommonModule],
  templateUrl: './place-order.html',
  styleUrl: './place-order.css'
})
export class PlaceOrder {
  cart = [
    { id: 'P-101', name: 'Laptop', qty: 1, price: 60000 },
    { id: 'P-102', name: 'Mouse', qty: 2, price: 500 }
  ];

  get total(): number {
    return this.cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  placeOrder() {
    alert('Order placed successfully!');
    this.cart = []; // clear cart after placing order
  }
}
