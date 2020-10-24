import { Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import { Product } from '../models/product';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') cart: ShoppingCart;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private shoppingCartService: ShoppingCartService, private router:Router){}
  
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Product){
    this.shoppingCartService.removeFromCart(product);
  }
}
