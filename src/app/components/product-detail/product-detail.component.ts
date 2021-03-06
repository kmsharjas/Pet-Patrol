import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  relatedProducts$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private wishlistservice: WishlistService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      switchMap((params) => this.productService.getProduct(params['id']))
    );
    this.relatedProducts$ = this.productService.getProducts({}, 4);
  }

  addToCart(product: Product, quantity: number) {
    if (quantity > 10) return alert('Maximum quantity is 10');
    if (this.cartService.checkCartItem(product.id))
      return alert('This product is already in your cart');

    let cartItem: CartItem = {} as CartItem;
    cartItem.id = product.id;
    cartItem.name = product.name;
    cartItem.price = product.price;
    cartItem.offerTitle = product.offertitle ?? 'N/A';

    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * cartItem.quantity;
    cartItem.image = product.thumbnail_img;
    console.log(cartItem.quantity);

    if (/^buy\s*\d+\s*get\s*\d+$/.test(product.offertitle)) {
      console.log(product.offertitle);
      const buy = parseInt(product.offertitle.match(/\d+/g)[0], 10);
      const get = parseInt(product.offertitle.match(/\d+/g)[1], 10);
      console.log(buy, get);
      cartItem.quantity += Math.floor((cartItem.quantity / buy) * get);

      console.log(cartItem.quantity);
    }

    // if (/^buy\s*\d+\s*get\s*\d+$/.test(product.offertitle)) {
    //   console.log(product.offertitle);
    //   const buy = parseInt(product.offertitle.match(/\d+/g)[0], 10);
    //   const get = parseInt(product.offertitle.match(/\d+/g)[1], 10);
    //   console.log(buy, get);
    //   cartItem.offerQuantity = cartItem.quantity === buy ? get : 0;
    //   console.log(cartItem.offerQuantity);
    // }

    this.cartService.addToCart(cartItem);
    this.router.navigate(['/cart']);
  }

  addToWish(product: Product) {
    // console.log(product);
    // this.userservice.getUser();
    // console.log(this.userservice.getUser());
    const user = this.userservice.getUser();
    this.wishlistservice.addToWish(product, user.id);
    // this.router.navigate(['/wishlist']);
  }
}
