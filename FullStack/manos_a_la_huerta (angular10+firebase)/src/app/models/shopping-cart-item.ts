import { Product } from 'src/app/models/product';

export class ShoppingCartItem {
  key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;

  constructor(){}
}