import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerGoodSOut, managerGoodSOutApi } from '../../../interfaces/managerlist';
import { GoodsOutService } from 'src/app/services/goodsout.service';

@Component({
  selector: 'app-goods-out-list',
  templateUrl: './goods-out-list.component.html',
  styleUrls: ['./goods-out-list.component.scss']
})

  export class GoodsOutListComponent implements OnInit {
    managerGoodsOut: managerGoodSOut[] = [];

    constructor(private router: Router,
      private GoodsOutservice: GoodsOutService,
      private route: ActivatedRoute) { }
      ngOnInit(): void {

        console.log("datadan")
        this.loadData()
        }           
        
        loadData() {
    
          this.GoodsOutservice.getGoodSOut().subscribe((response: managerGoodSOutApi) => {
            console.log('esaa axali responsi', response);
            this.managerGoodsOut = response;  
            console.log(this.managerGoodsOut);
          });
        }
  
}
