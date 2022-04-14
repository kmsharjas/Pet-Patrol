import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  @Output() track = new EventEmitter<Order>();

  refresh$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.orders$ = combineLatest([this.userService.user$, this.refresh$]).pipe(
      switchMap(([user, refresh]) => {
        if (user && user.id) return this.orderService.listordersByuser(user.id);
        return of([]);
      }),
      map((orders) => {
        // reverse order by datetime
        return orders.sort(
          (a, b) =>
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        );
      })
    );
  }

  checkExpry(order: Order): boolean {
    const expiry = new Date(order.payment.created_at).getTime() + 86400000;
    const now = new Date().getTime();
    return !(
      expiry < now ||
      order.order_status === 'cancelled' ||
      order.payment.dispatched_at
    );
  }

  cancelOrder(order: Order) {
    // cofirm cancel
    if (!confirm('Are you sure you want to cancel this order?')) return;
    order.order_status = 'cancelled';
    this.orderService
      .updateOrderStatus(order)
      .subscribe(() => this.refresh$.next(true));
  }

  onTrack(order: Order) {
    this.track.emit(order);
  }
}
