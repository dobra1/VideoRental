export interface Product {
  _id?: string;
  title: string;
  aquisitionDate: string;
  serialNumber: string;
  status: 'available'|'borrowed'|'disposed';
  returnDate?: string | null; 
}
