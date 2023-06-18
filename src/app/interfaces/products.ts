
export interface Products {
    barcode: string;
    name: string;
    unit: string;
    quantity: number;
    price: number
  }
  
  export type ProductsAddApiResponse = Products[];
  