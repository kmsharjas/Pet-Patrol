import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiRoot: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createOrder(order: any | Order) {
    return this.http.post(`${this.apiRoot}/createorder`, order);
  }

  updateOrder(order: Order) {
    return this.http.post(`${this.apiRoot}/updateorder/${order.id}`, order);
  }

  updateOrderStatus(order: Order) {
    const { id, order_status } = order;
    return this.http.post(`${this.apiRoot}/updateorderstatus/${id}`, {order_status}); // prettier-ignore
  }

  listordersByuser(id: number) {
    return this.http.get<Order[]>(`${this.apiRoot}/listorderbyuser/${id}`);
  }

  capturePayment(response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    amount: number;
  }) {
    return this.http.post(`${this.apiRoot}/paymentcapture`, response);
  }
}
