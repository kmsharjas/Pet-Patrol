import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);

  constructor() {
    this.refreshCart();
  }
  addToCart(cartItem: CartItem) {
    if (localStorage.getItem('cart-item')) {
      const cartItems = JSON.parse(localStorage.getItem('cart-item'));
      cartItems.push(cartItem);
      localStorage.setItem('cart-item', JSON.stringify(cartItems));
    } else {
      const cartItems = [];
      cartItems.push(cartItem);
      localStorage.setItem('cart-item', JSON.stringify(cartItems));
    }

    this.refreshCart();
  }

  refreshCart() {
    this.cartItems$.next(this.getCartItems());
  }

  getCartItems() {
    const cartItem: CartItem[] = JSON.parse(localStorage.getItem('cart-item'));
    return cartItem;
  }

  updateCartItem(cartItem: CartItem) {
    const cartItems = JSON.parse(localStorage.getItem('cart-item'));
    const index = cartItems.findIndex((item) => item.id === cartItem.id);
    cartItems[index] = cartItem;
    localStorage.setItem('cart-item', JSON.stringify(cartItems));
    this.refreshCart();
  }

  removeCartItem(cartItem: CartItem) {
    const cartItems = JSON.parse(localStorage.getItem('cart-item'));
    const index = cartItems.findIndex((item) => item.id === cartItem.id);
    cartItems.splice(index, 1);
    localStorage.setItem('cart-item', JSON.stringify(cartItems));
    this.refreshCart();
  }

  checkCartItem(id: number) {
    const cartItems = JSON.parse(localStorage.getItem('cart-item'));
    if (!cartItems) return false;
    return cartItems.some((item) => item.id === id);
  }

  clearCart() {
    localStorage.removeItem('cart-item');
    this.refreshCart();
  }
}
