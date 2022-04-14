import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Order, OrderItem } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('addressForm') addressForm: AddressFormComponent;
  cartItems: CartItem[];
  grandTotal: number;
  TotPrice: number;
  length: number;
  isnewAddress: boolean = false;
  user: User;

  formValues$: Observable<any>;

  countries?: { id: number; country: string }[];
  states?: { id: number; state: string }[];
  addressType?: { id: number; type: string }[];
  paymentMethod: 'COD' | 'Online';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private addressService: AddressService,
    private winRef: WindowRefService,
    private rout: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.formValues$ = this.userService.user$.pipe(
      switchMap((user) => {
        // console.log(user);

        this.user = user;
        return this.userService.getDefaultAddress(user.id);
      }),
      map((address) => {
        if (!address) return {};
        // console.log(address);
        // check for empty object
        if (address.mobile === '') this.isnewAddress = true;
        // console.log(this.isnewAddress);
        return address;
      })
    );

    this.cartItems = this.cartService.getCartItems();
    this.length = this.cartItems?.length;
    this.TotPrice = this.cartItems?.reduce((a, b) => a + b.total, 0);
    this.grandTotal = this.TotPrice + 50;

    this.addressService.coutries$.subscribe((res) => (this.countries = res));
    this.addressService.states$.subscribe((res) => (this.states = res));
    this.addressService.addressType$.subscribe(
      (res) => (this.addressType = res)
    );
  }

  placeOrder() {
    // console.log(items);

    if (!this.paymentMethod) return alert('Please select payment method');

    if (this.addressForm.addressForm.invalid) {
      console.log(this.addressForm.addressForm.value);
      return alert('Please fill all the fields');
    }

    if (this.isnewAddress)
      this.addressService.addAddress({
        ...this.addressForm.addressForm.value,
        isDefault: true,
        cust_id: this.user.id,
      });

    const { isDefault, ...address } = this.addressForm.addressForm.value;

    address.state = this.states.find((state) => state?.id === +address.state).state; // prettier-ignore
    address.country = this.countries.find((country) => country.id === +address.country).country; // prettier-ignore
    address.add_type = this.addressType.find((type) => type.id === +address.add_type).type; // prettier-ignore

    const items: OrderItem[] = this.cartItems?.map((item) => {
      return {
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.total,
        product_id: item.id,
      };
    });

    const order: Order = {
      customer_id: this.user.id,
      customer_name: `${this.user.first_name} ${this.user.last_name}`,
      customer_mobile: this.user.mobile,
      customer_address: Object.values(address).join(','),
      items,
      payment: {
        payment_method: this.paymentMethod,
      },
    };

    console.log(order);

    this.orderService.createOrder(order).subscribe((res) => {
      this.cartService.clearCart();
      if (this.paymentMethod === 'COD')
        return this.rout.navigate(['/orderResponse'], {
          queryParams: { response: 'success' },
        });

      return false;

      // console.log(order);
      // console.log(res);
      // this.order = res;
      // this.createRzpayOrder(res);
    });
    // get form value
    // call api to create order_id
  }
}
