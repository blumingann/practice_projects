import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit { 
  @Input('cart') cart: ShoppingCart;

  shipping = {};
  cart$: Observable<ShoppingCart>
  cartSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService){}

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
