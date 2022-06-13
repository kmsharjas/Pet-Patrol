import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  api = environment.apiBaseUrl;
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
    private userService: UserService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({
      id: [null],
      testimonial: [null],
      AllData: [null],
    });
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
      console.log(this.orderTrack);

      this.showReview(this.orderTrack);
    } else {
      this.selection = 'order';
      this.orderTrack = null;
    }
  }

  addreview() {
    // console.log(this.isShow);
    // check login
    const user = this.userService.getUser();
    // console.log(user);

    // if (!user) return alert('Please login to continue');
    if (!user) {
      alert('Please login to continue');
      // this.openLogin();
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/account' },
      });
    } else {
      this.isShow = true;
      // console.log(this.isShow);
    }
  }

  saveReview(orderTrack, closeBtn) {
    console.log(this.testimonialForm.value);
    const user = this.userService.getUser();
    let jsn = {
      customerid: user?.id,
      order_id: orderTrack.id,
      review: this.testimonialForm.controls['testimonial'].value,
    };
    // console.log(jsn);

    this.http.post(`${this.api}/createtestimonial`, jsn).subscribe((res) => {
      // console.log(res);
      // alert('Testimonial Added Successfully');
      // this.isShow = false;
      this.testimonialForm.reset();
      closeBtn.click();
      this.toggleTrack();
    });
  }

  async showReview(orderTrack: Order) {
    if (!orderTrack.payment.delivered_at) return (this.isReview = false);
    try {
      const res = await this.http
        .get(`${this.api}/listtestimonialbyorderid/${orderTrack.id}`)
        .toPromise();
      console.log(res);
      return (this.isReview = false);
    } catch (error) {
      console.log(error);
      return (this.isReview = true);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
