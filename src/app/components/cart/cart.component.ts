import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]>;

  subTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cartItems$.pipe(
      map((items) => {
        this.subTotal = items.reduce((acc, item) => acc + item.total, 0);
        return items;
      })
    );
  }

  onChangeQty(item: CartItem, ev: Event) {
    const quantity = +(ev.target as HTMLInputElement).value;

    item.quantity = quantity;
    item.total = item.price * item.quantity;

    if (/^buy\s*\d+\s*get\s*\d+$/.test(item.offerTitle)) {
      const buy = parseInt(item.offerTitle.match(/\d+/g)[0], 10);
      const get = parseInt(item.offerTitle.match(/\d+/g)[1], 10);

      // item.quantity = quantity + Math.floor((item.quantity / buy) * get);
      item.total = (quantity - Math.floor((quantity / buy) * get)) * item.price;
    }

    this.cartService.updateCartItem(item);
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeCartItem(item);
  }
}
