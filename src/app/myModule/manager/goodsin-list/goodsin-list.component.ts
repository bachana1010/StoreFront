import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerGoodSin, managerGoodSinApi } from '../../../interfaces/managerlist';
import { GoodsinService } from 'src/app/services/goodsin.service';

@Component({
  selector: 'app-goodsin-list',
  templateUrl: './goodsin-list.component.html',
  styleUrls: ['./goodsin-list.component.scss']
})

export class GoodsinListComponent implements OnInit {

  managerGoodsin: managerGoodSin[] = [];

  constructor(private router: Router,
    private GoodsInservice: GoodsinService,
    private route: ActivatedRoute) { }


    ngOnInit(): void {

      console.log("datadan")
      this.loadData()
      }           
      
      loadData() {
  
        this.GoodsInservice.getGoodSin().subscribe((response: managerGoodSinApi) => {
          console.log('esaa axali responsi', response);
          this.managerGoodsin = response;  
          console.log(this.managerGoodsin);
        });
      }

}
