import { Observable } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {

  $key: string;

  datePlaced: number = new Date().getTime();

  constructor(
    public userName: string,
    public userId: string,
    public shipping: any,
    public items: ShoppingCartItem[],
    public totalQuantity: number,
    public totalPrice: number){
  
    this.datePlaced = new Date().getTime();
  }

  get productIds(){
    return Object.keys(this.items);
  }
}