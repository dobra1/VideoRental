import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../_model/customer'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "http://localhost:3000";
  httpClient = inject(HttpClient);

  private customers : Array<Customer> = [];

  getCustomers() {
    return this.httpClient.get<Customer[]>(this.apiUrl + '/customers');
  } 

  getCustomer(id: string) {
    return this.httpClient.get<Customer>(this.apiUrl + '/customers/'+ id);
  }

  
  addCustomer(model: Customer) {
    return this.httpClient.post(this.apiUrl + '/customers', model);
  }

  updateCustomer(id: string, model: Customer) {
    return this.httpClient.put(this.apiUrl + '/customers/' + id, model);
  }

  updateCustomerStatus(id: string, status: 'active' | 'inactive'): Observable<Customer> {
    return this.httpClient.patch<Customer>(`${this.apiUrl}/customers/${id}/status`, { status });
  }

}