import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../_model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {

  formBuilder = inject(FormBuilder);
  
  productForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    aquisitionDate: ['', Validators.required], 
    serialNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]], 
    status: ['', Validators.required],        
  });

  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editProductId!: string;
  
  ngOnInit() {
    this.editProductId = this.route.snapshot.params["id"];
    if(this.editProductId) {
      this.productService.getProduct(this.editProductId).subscribe((result) => {
        this.productForm.patchValue(result);
      });
    }
  }
  addProduct() {
    if(this.productForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model:Product = this.productForm.value;
    this.productService.addProduct(model).subscribe(result => {
      alert("A termék sikeresen hozzáadva!");
      this.router.navigateByUrl("/products")
    })
  }
  updateProduct(){
    if(this.productForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model: Product = this.productForm.value;
    this.productService.updateProduct(this.editProductId, model).subscribe(result => {
      alert("A termék sikeresen módósítva!");
      this.router.navigateByUrl('/products');
    })

  }

}
