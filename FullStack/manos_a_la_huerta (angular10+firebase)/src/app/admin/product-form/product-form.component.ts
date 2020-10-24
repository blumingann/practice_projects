import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: any = {};
  id;
  faSave = faSave;
  faTrash = faTrash;

  ngOnInit(): void {}

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .valueChanges()
        .subscribe((p) => (this.product = p));
    }
  }

  save(product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.createProduct(product);
    }
    this.router.navigate(['admin/products']);
  }

  deleteProduct() {
    if (!confirm('Seguro que desea eliminar?')) {
      return;
    }
    this.productService.deleteProduct(this.id);
    this.router.navigate(['admin/products']);
  }
}
