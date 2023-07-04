export interface GoodsiOut {
    barcode: string;

    quantity: number;
  }
  
  export type GoodsinAddApiResponse = GoodsiOut[];
  
  export interface GoodsoutFilter {
    quantityValue?: number;
    quantityOperator?: string;
    dateFrom?: string;
    dateTo?: string;
    outDate?: string;
  }
  
  
  
  