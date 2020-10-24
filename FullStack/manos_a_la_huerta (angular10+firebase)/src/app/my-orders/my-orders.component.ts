import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$: Observable<any>;
  
  constructor(
    private auth: AuthService,
    private order: OrderService) {

    this.order$ = this.auth.user$.pipe(switchMap(u => this.order.getOrdersByUser(u.uid).valueChanges()));
  }
}
