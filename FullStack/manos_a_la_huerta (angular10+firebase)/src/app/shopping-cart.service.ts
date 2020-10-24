import { Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{


  cart: AngularFireObject<ShoppingCart>
  constructor(private db: AngularFireDatabase, private router: Router) {}

  private create() {
   return  this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

 async getCart() {
   const cartId = await this.getOrCreateCartId();
   return (this.cart = this.db.object('/shopping-carts/' + cartId)).valueChanges().pipe(map(x => new ShoppingCart(x.items)));
}

private getItem(cartId, productId: string) {
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

public async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem (cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
     if (item){ item$.update({ quantity : (item.quantity || 0) + 1 });
   }else{
     item$.set({ 
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      category: product.category,
      quantity: 1});
    }
   });
  }

  async removeFromCart(product: Product){
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem (cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
     let quantity = (item.quantity || 0);
     if (quantity === 1) item$.remove();
     else item$.update({ quantity : quantity - 1 });
   });
  }
  async clearCart(){
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }
}
