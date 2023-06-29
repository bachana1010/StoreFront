export interface GoodsinAdd {
  quantity: number;
  entryDate: string;
  branchName: string;
  operatorUserName: string;
  barcodeName: string;
}

export type GoodsinAddApiResponse = GoodsinAdd[];

export interface PaginatedManagerGoodSin {
  totalCount: number;
  results: GoodsinAdd[];
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

