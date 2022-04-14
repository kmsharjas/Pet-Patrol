import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import {
  AnimalCategory,
  ServiceCategory,
  ServiceSubCategory,
} from 'src/app/models/navCategory.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen = false;

  cartQty$: Observable<number>;
  user$: Observable<User> = this.userService.user$;

  animalCategory$: Observable<AnimalCategory[]>;

  animalCategory: AnimalCategory[] = [];
  selectedAnimalIndex = 0;

  constructor(
    private mainservices: MainService,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.mainservices.getNavList().subscribe((res) => {
      console.log(res);
      this.animalCategory = res;
    });

    this.cartQty$ = this.cartService.cartItems$.pipe(
      map((items) => items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0)
    );

    // this.cartQty$.subscribe(console.log);
  }
}
