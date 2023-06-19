
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
    

  export interface managerGoodSOut {
    barcodeName: string;
    operatorUserName: string;
    branchName: string;
    quantity: number;
    outDate: Date;

  }
  
  export type managerGoodSOutApi = managerGoodSOut[];
    



