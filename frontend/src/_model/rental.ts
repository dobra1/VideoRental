import { Customer } from './customer';
import { Product } from './product';

export interface Rental {
  _id?: string;
  product: Product;
  productId: string;
  rentalDate: string;
  returnDate: string | null;
  delay: string;
  customer: Customer;
}
