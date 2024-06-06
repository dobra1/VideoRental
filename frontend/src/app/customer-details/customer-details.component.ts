import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'; 
import { Customer } from '../../_model/customer'; 
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer!: Customer; 

  constructor(
    private customerService: CustomerService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const customerId = paramMap.get("customerID"); 
      if (customerId) {
        this.customerService.getCustomer(customerId).subscribe(
          (customer: Customer) => {
            if (customer) {
              this.customer = customer;
            } else {
              this.router.navigate(["/customers"]); 
            }
          },
          (error) => {
            console.error("Error fetching customer:", error);
            this.router.navigate(["/customers"]); 
          }
        );
      } else {
        this.router.navigate(["/customers"]); 
      }
    });
  }
}
