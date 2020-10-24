import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit{
  faShoppingCart = faShoppingCart;
  appUser: AppUser;
  shoppingCartItemCount: number;
  isCollapsed;
  cart: any;

  constructor(public auth: AuthService, private router: Router, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  async ngOnInit(){
    this.auth.appUser.subscribe((appUser) => (this.appUser = appUser));
    this.cart = await this.shoppingCartService.getCart();
  }
}
