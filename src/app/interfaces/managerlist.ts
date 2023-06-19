
export interface managerProduct {
    barcode: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    brancheName: string

  }
  
  export type managerProductApiResponse = managerProduct[];
  