import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../_model/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private httpClient: HttpClient) {}

  addRental(model: Partial<Rental>): Observable<Rental> {
    const rentalDataWithStatus = {
      ...model,
      status: 'borrowed' 
    };
    return this.httpClient.post<Rental>(`${this.apiUrl}/rentals`, rentalDataWithStatus);
  }

  updateReturnDate(rentalId: string, date: string): Observable<Rental> {
    const url = this.apiUrl + '/return/' + rentalId;
    const request = { returnDate: date };
    return this.httpClient.put<Rental>(url, request);
  }

  getRentalByCustomer(customerId: string): Observable<Rental[]> {
    const rentDuration = 1;
    return this.httpClient.get<Rental[]>(`${this.apiUrl}/rentals/customer/${customerId}/rentDuration/${rentDuration}`);
  }

  rentProduct(rentalData: any): Observable<Rental> {
    return this.httpClient.post<Rental>(`${this.apiUrl}/rentals`, rentalData);
  }

  getDelayedRentals(rentDuration: number): Observable<Rental[]> {
    return this.httpClient.post<Rental[]>(`${this.apiUrl}/delays`, { rentDuration });
  }
}
