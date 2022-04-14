import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-response',
  templateUrl: './order-response.component.html',
  styleUrls: ['./order-response.component.css'],
})
export class OrderResponseComponent implements OnInit {
  params$: Observable<any>;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.params$ = this.router.queryParams;
  }
}
