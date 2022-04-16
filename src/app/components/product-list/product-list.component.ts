import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  sortFilter$: BehaviorSubject<'asc' | 'desc'> = new BehaviorSubject('asc');
  animalCategory: number = 0;

  packagingType: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // get query parmas
    this.products$ = combineLatest([
      this.sortFilter$,
      this.route.queryParamMap,
    ]).pipe(
      switchMap(([sort, params]) => {
        this.animalCategory = +params.get('animal_category');
        this.packagingType = +params.get('packaging_type');
        this.minPrice = +params.get('min_price');
        this.maxPrice = +params.get('max_price');

        return this.productService.getProducts({ ...params['params'], sort });
      })
    );
  }
}
