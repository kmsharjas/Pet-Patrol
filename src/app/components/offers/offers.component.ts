import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  BehaviorSubject,
  combineLatest,
  switchMap,
  map,
} from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  products$: Observable<Product[]>;
  banner: any = [];
  sortFilter$: BehaviorSubject<'asc' | 'desc'> = new BehaviorSubject('asc');
  apiRoot = environment.apiBaseUrl;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // get query parmas
    this.products$ = combineLatest([
      this.sortFilter$,
      this.route.queryParamMap,
    ]).pipe(
      switchMap(([sort, params]) => {
        // this.animalCategory = +params.get('animal_category');
        // this.packagingType = +params.get('packaging_type');
        // this.minPrice = +params.get('min_price');
        // this.maxPrice = +params.get('max_price');

        const search = params.get('search');
        if (search) return this.productService.search(search);

        return this.productService.getProducts({ ...params['params'], sort });
      }),
      map((products) => {
        return products.filter((product) => {
          return (
            product.offertitle === 'buy 1 get 1' ||
            product.offertitle === 'Combo'
          );
        });
      })
    );
    this.http.get(this.apiRoot + '/listofferbanner').subscribe((res) => {
      console.log(res);
      this.banner = res;
    });
  }
}
