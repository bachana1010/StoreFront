import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { GetBranch } from '../../../interfaces/branch';
import { Products,ProductsAddApiResponse } from '../../../interfaces/products';



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
