import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_model/customer';
import { Product } from '../../_model/product';
import { Rental } from '../../_model/rental';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { RentalService } from '../../services/rental.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomerId: string = '';
  selectedCustomer: Customer | null = null;
  rentals: Rental[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';
  selectedProducts: Product[] = [];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
  }
  

  loadCustomers() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this.applyFilter();
    });
  }

  loadCustomerDetails() {
    this.selectedCustomer = this.customers.find(customer => customer._id === this.selectedCustomerId) || null;
    if (this.selectedCustomerId) {
      this.loadRentalsByCustomer(this.selectedCustomerId);
    }
  }

  loadRentalsByCustomer(customerId: string) {
    this.rentalService.getRentalByCustomer(customerId).subscribe(result => {
        this.rentals = result.filter(rental => !rental.returnDate);
    }, error => {
        console.error('Hiba történt az ügyfél kölcsönzéseinek lekérése közben:', error);
    });
}

  applyFilter() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      product.serialNumber.toString().includes(this.searchText)
    );
  }

  selectProduct(product: Product, event: MouseEvent) {
    event.preventDefault();
    const index = this.selectedProducts.findIndex(p => p._id === product._id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.some(selectedProduct => selectedProduct._id === product._id);
  }

  openRentModal() {
    const rentModal = new bootstrap.Modal(document.getElementById('rentModal'), {});
    rentModal.show();
  }

  rentProduct() {
    console.log("Kölcsönzés gomb megnyomva"); 
    if (!this.selectedCustomerId) {
      alert('Kérjük, válassza ki az ügyfelet!');
      return;
    }
  
    const rentalRequests = this.selectedProducts.map(product => {
      const rentalData: Partial<Rental> = {
        customer: this.selectedCustomer!, 
        product: product,
        productId: product._id!,
        rentalDate: new Date().toISOString(),
        returnDate: null
      };
  
      console.log("Kölcsönzéshez elküldött adatok:", rentalData); 
  
      return this.rentalService.addRental(rentalData).pipe(
        tap(() => {
          product.status = 'borrowed';
        })
      );
    });
  
    forkJoin(rentalRequests).subscribe({
      next: () => {
        alert('Kölcsönzés sikeres!');
        this.selectedProducts = [];
        this.loadCustomerDetails();
        this.closeRentModal();
      },
      error: (error) => {
        console.error('Kölcsönzés hiba:', error);
        alert('Kölcsönzés hiba történt!');
      }
    });
  }
  
  closeRentModal() {
    const rentModalElement = document.getElementById('rentModal');
    if (rentModalElement) {
      const rentModal = bootstrap.Modal.getInstance(rentModalElement);
      rentModal?.hide();
    }
  }
  
  
}
