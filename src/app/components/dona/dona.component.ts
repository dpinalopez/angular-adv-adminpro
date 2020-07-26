import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title: string = 'Sin Titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['Label1','Label2','Label2'];
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];
  
  public colors: Color[] = [
  {backgroundColor: ['#9E120E','#FF5800','#FFB414']}
  ];
  

  ngOnInit(): void {    


   }




  
  

  


}
