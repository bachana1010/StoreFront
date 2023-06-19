import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerGoodSin, managerGoodSinApi } from '../../../interfaces/managerlist';

@Component({
  selector: 'app-goodsin-list',
  templateUrl: './goodsin-list.component.html',
  styleUrls: ['./goodsin-list.component.scss']
})

export class GoodsinListComponent implements OnInit {

  managerGoodsin: managerGoodSin[] = [];

  constructor(private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }


    ngOnInit(): void {

      console.log("datadan")
      this.loadData()
      }           
      
      loadData() {
  
        this.productService.getGoodSin().subscribe((response: managerGoodSinApi) => {
          console.log('esaa axali responsi', response);
          this.managerGoodsin = response;  
          console.log(this.managerGoodsin);
        });
      }

}
