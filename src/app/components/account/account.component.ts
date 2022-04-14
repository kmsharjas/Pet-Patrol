import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$ = this.userService.user$;
  profileForm: FormGroup;
  addressForm: FormGroup;

  isReview = true;

  selection = 'personal';
  orderTrack?: Order;
  testimonialForm: FormGroup;
  isShow: boolean = false;
  review: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.profileForm.patchValue(user);
      this.profileForm.get('first_name').disable();
      this.profileForm.get('last_name').disable();
      this.profileForm.get('email').disable();
      this.profileForm.get('mobile').disable();
    });
    const user = JSON.parse(localStorage.getItem('user'));
  }

  toggle() {
    this.profileForm.get('first_name').enable();
    this.profileForm.get('last_name').enable();
    this.profileForm.get('email').enable();
    this.profileForm.get('mobile').enable();
  }

  save() {
    const user = JSON.parse(localStorage.getItem('user'));
    const profile = this.profileForm.value;
    this.userService.updateUser(profile, user.id);
    this.profileForm.get('first_name').disable();
    this.profileForm.get('last_name').disable();
    this.profileForm.get('email').disable();
    this.profileForm.get('mobile').disable();
  }

  toggleTrack(order?: Order) {
    if (order) {
      this.selection = 'track';
      this.orderTrack = order;
      // this.showReview(this.orderTrack);
    } else {
      this.selection = 'order';
      this.orderTrack = null;
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
