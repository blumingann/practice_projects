import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  productList: Product[] = [];
  filteredProducts: any[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe((item) => {
        this.filteredProducts = this.productList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.productList.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.productList;
  }
}
