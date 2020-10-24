import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  faPaperPlane = faPaperPlane;

  @Input('cart') cart: ShoppingCart;

  disableBtn: boolean;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;
  appUser: AppUser = {} as AppUser;
  userName: string;
  userNameSubscription: Subscription;
  orderNumberSubscription: Subscription;
  orderId: string;
  id: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService, 
    private route: ActivatedRoute,
    private db: AngularFireDatabase){}

  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.userNameSubscription = this.authService.appUser.subscribe(user => this.userName = user.name);
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
    this.userNameSubscription.unsubscribe()
  }

  placeOrder(){
    const order = new Order(
      this.userName,
      this.userId,
      this.shipping,
      this.cart.items,
      this.cart.totalItemsCount,
      this.cart.totalPrice,
      );
    
    this.orderService.storeOrder(order)
      .then(ref => {
        this.shoppingCartService.clearCart();
        this.router.navigate(['order-success', ref.key]);
      })
      .catch(err => {
        this.disableBtn = false;
        console.log(err);
      });
    this.disableBtn = true;
  }
}
