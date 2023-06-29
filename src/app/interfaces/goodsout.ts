export interface GoodsiOut {
    barcode: string;

    quantity: number;
  }
  
  export type GoodsinAddApiResponse = GoodsiOut[];
  
  export interface GoodsoutFilter {
    quantity?: number;
    quantityOperator?: string;
    dateFrom?: string;
    dateTo?: string;
  }
  