import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishItems$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  baseUrl = environment.apiBaseUrl;
  constructor(
    private userservice: UserService,
    private http: HttpClient,
    private router: Router
  ) {
    this.refreshWish();
  }
  addToWish(product: Product, user) {
    console.log(JSON.stringify(product) + ' ' + user);
    return (
      this.http
        .post(`${this.baseUrl}/addtowishlist/${user}`, {
          product_id: product.id,
        })
        // .subscribe();
        .subscribe((data) => {
          // console.log(data);

          // this.refreshWish();
          this.router.navigate(['/wishlist']);
        })
    );
  }

  refreshWish() {
    // this.wishItems$.next(this.getWishItems());
  }

  getWishItems() {
    const user = this.userservice.getUser();
    return this.http.get(`${this.baseUrl}/listwishlistbycustomer/${user.id}`);
    // const cartItem: CartItem[] = JSON.parse(localStorage.getItem('cart-item'));
    // return cartItem;
  }

  // updateWishItem(cartItem: CartItem) {
  //   const cartItems = JSON.parse(localStorage.getItem('cart-item'));
  //   const index = cartItems.findIndex((item) => item.id === cartItem.id);
  //   cartItems[index] = cartItem;
  //   localStorage.setItem('cart-item', JSON.stringify(cartItems));
  //   this.refreshWish();
  // }

  removeWishItem(id) {
    console.log(id);

    return this.http
      .delete(`${this.baseUrl}/deletewishlistbyid/${id}`)
      .subscribe();
    this.refreshWish();
  }

  // checkWishItem(id: number) {
  //   const cartItems = JSON.parse(localStorage.getItem('cart-item'));
  //   if (!cartItems) return false;
  //   return cartItems.some((item) => item.id === id);
  // }

  clearWish() {
    localStorage.removeItem('cart-item');
    this.refreshWish();
  }
}
