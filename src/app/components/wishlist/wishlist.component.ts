import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products$: Observable<Product[]>;
  products: any = [];
  refresh$ = new BehaviorSubject(true);
  someSubscription: any;
  constructor(private wishlistservice: WishlistService) {}

  ngOnInit(): void {
    this.wishlistservice.getWishItems().subscribe((data) => {
      // console.log(data);
      console.log('hi');

      this.products = data;
      // this.refresh$.next(true);
      console.log(this.products);
      this.refresh$.next(true);
    });
  }
  delete(product) {
    console.log(product);
    confirm('Are you sure you want to delete this item from your wishlist?');
    {
      this.wishlistservice.removeWishItem(product.id);
      // this.refresh$.next(true);
    }
  }
}
