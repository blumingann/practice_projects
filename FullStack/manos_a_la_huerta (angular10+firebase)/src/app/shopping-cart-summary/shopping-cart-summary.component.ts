import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{
  cart: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    this.cart = await (await this.shoppingCartService.getCart());
  }

}
