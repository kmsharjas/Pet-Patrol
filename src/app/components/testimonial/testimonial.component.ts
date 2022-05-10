import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiscService } from 'src/app/services/misc.service';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  distributorForm: FormGroup;
  constructor(private fb: FormBuilder, private miscService: MiscService) {
    this.distributorForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      mobile: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    AOS.init({ duration: 1200 });
  }

  contactMail() {
    console.log(this.distributorForm.value);
    let jsn = {
      name: this.distributorForm.value.name,
      email: this.distributorForm.value.email,
      mobile: this.distributorForm.value.mobile,
    };
    console.log(jsn);

    this.miscService.contactMail(jsn).subscribe((res) => {
      console.log(res);
      this.distributorForm.reset();
    });
  }

  customOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };
}
