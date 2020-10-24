import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Order } from './models/order';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order$: AngularFireObject<Order>;

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order){
    return this.db.list('/orders').push(order);
  }
  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }

  getOrderById(orderId: string) {
    return (this.order$ = this.db.object('/orders/' + orderId));
  }
 }

