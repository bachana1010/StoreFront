import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

export interface Products {
  barcode: string;
  name: string;
  unit: string;
  quantity: number;
  price: number
}

export type ProductsAddApiResponse = Products[];


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ProductData: Products[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {

  console.log("datadan")
  this.loadData()
  }


  loadData() {

    this.productService.getProducts().subscribe((response: ProductsAddApiResponse) => {
      console.log('esaa axali responsi', response);
      this.ProductData = response;  // your response is directly the array of users
      console.log(this.ProductData);
    });
  }







}
