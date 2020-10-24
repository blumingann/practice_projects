import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{

  @Input('order$') order$: Observable<any[]>;
  orders: Order[];
  subscription: Subscription;
  order: Order;

  constructor(private orderService: OrderService, private router: Router) {}

  async ngOnInit(){
   this.order$ = await this.orderService.getOrders().valueChanges();
  }
};