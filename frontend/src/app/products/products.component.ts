import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product';

@Component({
  selector: 'app-products',
  templateUrl: '../products/products.component.html',
  styleUrls: ['../products/products.component.scss']
})

export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      this.filteredProducts = result; 
    });
  }

  delete(id: string) {
    const ok = confirm("Biztos törlöni szeretné a terméket?");
    if (ok) {
      this.productService.deleteProduct(id).subscribe((result) => {
        alert("A termék sikeresen törölve. ");
        this.products = this.products.filter(product => product._id !== id);
        this.filteredProducts = this.filteredProducts.filter(product => product._id !== id);
      })
    }
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(this.searchText.toLowerCase()) || 
      product.serialNumber.toString().includes(this.searchText)
    );
  }
  
}
