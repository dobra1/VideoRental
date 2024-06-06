import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../_model/customer'; 
import { CustomerService } from '../../services/customer.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss'] 
})
export class CustomersFormComponent {

  formBuilder = inject(FormBuilder);
  
  customerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(10)]], 
    idNumber: ['', [Validators.required, Validators.pattern(/^\d{1,4}$/)]],
    address: ['', Validators.required], 
    status: ['', Validators.required],        
  });

  customerService = inject(CustomerService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editCustomerId!: string;
  
  ngOnInit() {
    this.editCustomerId = this.route.snapshot.params["id"];
    if(this.editCustomerId) {
      this.customerService.getCustomer(this.editCustomerId).subscribe((result) => {
        this.customerForm.patchValue(result);
      });
    }
  }
  
  addCustomer() {
    if(this.customerForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model: Customer = this.customerForm.value;
    this.customerService.addCustomer(model).subscribe(result => {
      alert("Az ügyfél sikeresen hozzáadva!");
      this.router.navigateByUrl("/customers")
    })
  }
  
  updateCustomer(){
    if(this.customerForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model: Customer = this.customerForm.value;
    this.customerService.updateCustomer(this.editCustomerId, model).subscribe(result => {
      alert("Az ügyfél sikeresen módósítva!");
      this.router.navigateByUrl('/customers');
    })

  }
}
