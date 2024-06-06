import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RentalComponent } from './rental/rental.component';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ReturnComponent } from './return/return.component';
import { UserComponent } from './user/user.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';


const routes: Routes = [
  { path: '',
   component: UserComponent 
  }, 
  { path: 'home',
   component: HomeComponent 

  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/add',
    component: CustomersFormComponent
  },
  {
    path: 'customers/:id',
    component: CustomersFormComponent
  },
  { 
    path: 'customer-details/:customerID', 
    component: CustomerDetailsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/add',
    component: ProductsFormComponent
  },
  {
    path: 'products/:id',
    component: ProductsFormComponent
  },
  { 
    path: 'product-details/:productID', 
    component: ProductDetailsComponent
  },
  {
    path: 'rental',
    component: RentalComponent
  },
  {
    path: 'return',
    component: ReturnComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
