export interface Customer {
    _id?: string; 
    name: string; 
    phone: string; 
    idNumber: string; 
    address: string; 
    status: 'active' | 'inactive';
}
