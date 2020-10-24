import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductService } from './../product.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') cart: Observable<ShoppingCart>;

  faPlus = faPlus;
  faMinus = faMinus;
  productList: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  category: string;

  categories: any[] = [
    {name: 'Todas las categorías'},
    {name: 'Frutas', category: 'frutas'},
    {name: 'Verduras', category: 'verduras'},
    {name: 'Otros', category: 'otros'},
];
  
  constructor(private productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService, 
    private router: Router) {
    const categories = this.categories;
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      // tslint:disable-next-line: no-shadowed-variable
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
        this.productList.filter(p => p.category === this.category) :
        this.productList;
      });
    });
  }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe((item) => {
        this.filteredProducts = this.productList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['key'] = element.key;
          this.productList.push(x as Product);
        });
      });

    this.cart = await (await this.shoppingCartService.getCart());
    }
}
