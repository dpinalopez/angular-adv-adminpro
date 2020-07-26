import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [[600, 450, 100]];

  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100]
  // ];

  // public colors: Color[] = [
  //   {backgroundColor: ['#9E120E','#FF5800','#FFB414']}
  // ];

}
