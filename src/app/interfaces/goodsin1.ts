export interface GoodsinAdd {
    barcode: string;
    name: string;
    price: number;
    unit: string;
    quantity: number;
  }
  
  export type GoodsinAddApiResponse = GoodsinAdd[];
  
  interface PaginatedGoodsin {
    currentPage: number;
    perPage: number;
    total: number;
    data: GoodsinAdd[];
  }
  