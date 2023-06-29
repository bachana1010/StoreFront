
export interface managerProduct {
    barcode: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    brancheName: string

  }
  
  export type managerProductApiResponse = managerProduct[];
  


  export interface managerGoodSin {
    barcodeName: string;
    operatorUserName: string;
    branchName: string;
    quantity: number;
    entryDate: Date;

  }
  
  export type managerGoodSinApi = managerGoodSin[];
    
  export interface PaginatedManagerGoodSin {
    currentPage: number;
    perPage: number;
    total: number;
    data: managerGoodSin[];
}

export interface GoodsinFilter {
  barcode?: string;
  name?: string;
  price?: number | null;
  unit?: string;
  quantity?: number | null;
  quantityOperator?: string;
  entryDate?: string;
  dateFrom?: string;
  dateTo?: string;
}




  export interface managerGoodSOut {
    barcodeName: string;
    operatorUserName: string;
    branchName: string;
    quantity: number;
    outDate: Date;

  }
  
  export type managerGoodSOutApi = managerGoodSOut[];
    



  export interface PaginatedManagerProduct {
    currentPage: number;
    perPage: number;
    total: number;
    data: managerProduct[];
}


export interface PaginatedManagerGoodSOut {
  currentPage: number;
  perPage: number;
  total: number;
  data: managerGoodSOut[];
}
