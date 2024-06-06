import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const productId = paramMap.get("productID");
      if (productId) {
        this.productService.getProduct(productId).subscribe(
          (product: Product) => {
            if (product) {
              this.product = product;
            } else {
              this.router.navigate(["/products"]);
            }
          },
          (error) => {
            console.error("Error fetching product:", error);
            this.router.navigate(["/products"]);
          }
        );
      } else {
        this.router.navigate(["/products"]);
      }
    });
  }
}
