import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit {

  dashboardData: any;
  colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info',  'bg-dark'];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getdashboard().subscribe(data => {
      this.dashboardData = data as any;  // typecast unknown to any
      console.log(this.dashboardData);
     
    }, error => {
      console.error('Error occurred while fetching dashboard data:', error);
    });
  }
}
