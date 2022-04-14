import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @ViewChild('addressForm') addressFormComponent: AddressFormComponent;
  closeBtn: any;

  address$: Observable<Address[]>;
  user: User;

  currentAddress: Address;
  constructor(
    private addressService: AddressService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.address$ = this.userService.user$.pipe(
      switchMap((user) => {
        this.user = user;
        return this.addressService.getAddresses(user.id);
      }),
      switchMap(() => this.addressService.address$)
    );
  }

  onSubmit(address: Address, closeBtn) {
    this.closeBtn = closeBtn;
    // console.log(this.currentAddress);
    this.currentAddress
      ? this.updateAddress(address)
      : this.addAddress(address);
  }

  async addAddress(address: Address) {
    // console.log(address);
    await this.addressService.addAddress({
      ...address,
      cust_id: this.user.id,
      // email: this.user.email,
    });
    this.reset();
  }

  async updateAddress(address: Address) {
    // console.log(address);
    if (!this.currentAddress) return;
    const { id, cust_id } = this.currentAddress;
    await this.addressService.updateAddress({ id, cust_id, ...address });
    this.reset();
  }

  setDefault(address: Address) {
    this.addressService.setDefaultAddress(address);
  }

  onEdit(address: Address) {
    console.log(address);
    this.currentAddress = address;
    this.addressFormComponent.addressForm.patchValue(address);
  }

  onDelete(address: Address) {
    confirm('Are you sure you want to delete this address?');
    {
      this.addressService.deleteAddress(address);
    }
  }

  reset() {
    this.closeBtn.click();
    this.currentAddress = null;
  }
}
