import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order$: Observable<Order>
  orderId: string;
  order: Order;
  orderSubscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService, 
    private db: AngularFireDatabase) { }

  async ngOnInit() {
    this.orderId = await this.route.snapshot.paramMap.get('id');
    console.log(this.orderId)
    this.order$ = await this.orderService.getOrderById(this.orderId).valueChanges();
  }
}
