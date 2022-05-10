import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.cartService.cartItems$?.value?.length > 0) return true;
    return this.router.parseUrl('/products');
    // check items in cart and return true or redirect to home
  }
}
