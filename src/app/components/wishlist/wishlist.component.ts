import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private wishlistservice: WishlistService) {}

  ngOnInit(): void {
    this.wishlistservice.getWishItems().subscribe((data) => {
      console.log(data);
      this.products = data;
      console.log(this.products);
    });
  }
  delete(product) {
    console.log(product);

    this.wishlistservice.removeWishItem(product.id);
  }
}
