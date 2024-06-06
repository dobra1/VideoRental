import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'; 
import { Customer } from '../../_model/customer'; 

@Component({
  selector: 'app-customers', 
  templateUrl: '../customers/customers.component.html', 
  styleUrls: ['../customers/customers.component.scss'] 
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = []; 
  filteredCustomers: Customer[] = []; 
  searchText: string = ''; 

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((result) => { 
      this.customers = result; 
      this.filteredCustomers = result; 
    });
  }

  updateCustomerStatus(id: string | undefined) {
    if (!id) {
      console.error("Customer ID is undefined.");
      return;
    }

    const ok = confirm("Biztos törölni szeretné az ügyfelet?"); 
    if (ok) {
      this.customerService.updateCustomerStatus(id, 'inactive').subscribe((updatedCustomer) => { 
        alert("Az ügyfél státusza inaktívra lett állítva."); 
        this.customers = this.customers.map(customer => 
          customer._id === id ? updatedCustomer : customer
        );
        this.filteredCustomers = this.filteredCustomers.map(customer => 
          customer._id === id ? updatedCustomer : customer
        );
      });
    }
  }

  applyFilter() {
    this.filteredCustomers = this.customers.filter(customer => 
      customer.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
      customer.idNumber.toString().includes(this.searchText) 
    );
  }
}
