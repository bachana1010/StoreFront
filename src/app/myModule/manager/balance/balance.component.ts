import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerProduct,managerProductApiResponse } from '../../../interfaces/managerlist';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  managerProduct: managerProduct[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {

    console.log("datadan")
    this.loadData()
    }           
    
    loadData() {

      this.productService.ManagerProducts().subscribe((response: managerProductApiResponse) => {
        console.log('esaa axali responsi', response);
        this.managerProduct = response;  // your response is directly the array of users
        console.log(this.managerProduct);
      });
    }
  
}
