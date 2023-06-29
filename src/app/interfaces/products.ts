
export interface Products {
    barcode: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    branchename? : string;
  }
  
  export type ProductsAddApiResponse = Products[];
  
  export interface ProductFilter {
    name?: string;
    priceOperator?: string;
    priceValue?: number;
    quantityOperator?: string;
    quantityValue?: number;
  }
  