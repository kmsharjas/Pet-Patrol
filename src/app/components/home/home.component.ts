import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnimalCategory } from 'src/app/models/navCategory.model';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  animalCategory: AnimalCategory[] = [];
  dogCategory: any;
  catCategory: any;
  constructor(private mainservices: MainService) {}

  ngOnInit(): void {
    AOS.init({ duration: 1200 });
    this.mainservices.getNavList().subscribe((res) => {
      console.log(res);
      this.animalCategory = res;
      this.dogCategory = this.animalCategory.find((x) => x.animal === 'Dog').id;
      this.catCategory = this.animalCategory.find((x) => x.animal === 'Cat').id;
    });
  }

  customOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 4000,
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
