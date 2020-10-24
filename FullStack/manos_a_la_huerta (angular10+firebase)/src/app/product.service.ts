import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: AngularFireList<any>;
  productId: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}

  createProduct(product) {
    return this.db.list('/productos').push(product);
  }

  getAll() {
    return (this.productList = this.db.list('productos'));
  }

  getProduct(productId) {
    return (this.productId = this.db.object('/productos/' + productId));
  }

  updateProduct(productId, product) {
    return this.db.object('/productos/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/productos/' + productId).remove();
  }
}
