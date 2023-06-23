
export interface Products {
    barcode: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    branchename? : string;
  }
  
  export type ProductsAddApiResponse = Products[];
  