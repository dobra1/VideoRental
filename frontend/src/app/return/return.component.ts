import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Customer } from '../../_model/customer';
import { Product } from '../../_model/product';
import { Rental } from '../../_model/rental';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  showModal: boolean = false;
  productId: string = '';
  csutomerId: string = '';
  customers: Customer[] = [];
  availableDVDs: Product[] = [];
  selectedCustomerId: string = '';
  selectedCustomer: Customer | null = null;
  selectedProduct: Product | null = null;
  products: Product[] = [];
  rentals: Rental[] = [];
  filteredProducts: Product[] = [];
  searchText:
  string = '';
  modalProduct: Product | null = null;
  newStatus: string = '';
  returnDate: string = '';

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
    if (this.selectedProduct) {
      this.searchText = this.selectedProduct?.serialNumber ?? '';
      this.filteredProducts = this.products.filter(product => 
        product._id === this.selectedProduct!._id
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  openStatusModal(product: Product, event: Event) {
    const target = event.target as HTMLSelectElement;
    const status = target.value;
    this.modalProduct = product;
    this.newStatus = status;
    this.showModal = true;
  }

  returnProduct(rental: Rental, event: Event) {
    event.preventDefault();
    const mouseEvent = event as MouseEvent;
    this.rentalService.updateReturnDate(rental._id || "", (new Date()).toISOString().split('T')[0]).subscribe(
      (result) => {
        alert("A termék sikeresen visszahozva.");
        console.log(result);
        this.loadRentalsByCustomer(this.selectedCustomerId); 
        this.loadProducts(); 
      },
      error => {
        console.error('Hiba történt a termék visszahozatalakor:', error);
        alert('Hiba történt a termék visszahozatalakor!');
      }
    );
  }
  

  closeStatusModal() {
    this.showModal = false;
    this.modalProduct = null;
    this.productId = '';
    this.newStatus = '';
  }
  
  saveReturn(rental: Rental) {
    const returnDate = new Date(); 
    this.rentalService.updateReturnDate(rental._id || "", returnDate.toISOString()).subscribe(
        (result) => {
            alert("A termék sikeresen visszahozva.");
            console.log(result);
            const rentalDate = new Date(rental.rentalDate);
            const today = new Date();
            const diffTime = today.getTime() - rentalDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            alert(`Késés: ${diffDays} nap`);
          
            this.rentals = this.rentals.filter(r => r._id !== rental._id);
            
            this.loadRentalsByCustomer(this.selectedCustomerId); 
            this.loadProducts(); 
        },
        error => {
            console.error('Hiba történt a termék visszahozatalakor:', error);
            alert('Hiba történt a termék visszahozatalakor!');
        }
    );
  }
  
confirmStatusChange() {
  if (this.modalProduct && this.newStatus) {
      if (this.newStatus === "available" || this.newStatus === "borrowed" || this.newStatus === "disposed") {
          if (this.newStatus === "available") {
              const today = new Date();
              this.returnDate = today.toLocaleDateString();
          }
          this.modalProduct.status = this.newStatus;
          this.productService.updateProductStatusOnly(this.modalProduct._id!, this.newStatus)
              .subscribe(
                  () => {
                      this.applyFilter();
                      this.closeStatusModal();
                  },
                  error => {
                      console.error('Hiba történt a státusz frissítésekor:', error);
                      alert('Hiba történt a státusz frissítésekor!');
                  }
              );
      } else {
          console.error('Érvénytelen státusz érték:', this.newStatus);
          alert('Érvénytelen státusz érték!');
      }
  }
}

}