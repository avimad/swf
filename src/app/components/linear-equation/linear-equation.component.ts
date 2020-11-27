import { Component, OnInit } from '@angular/core';
import { ILinearData } from 'src/app/models/data';
import { SwfServiceService } from 'src/app/services/swf-service.service';

@Component({
  selector: 'app-linear-equation',
  templateUrl: './linear-equation.component.html',
  styleUrls: ['./linear-equation.component.css']
})
export class LinearEquationComponent implements OnInit {

  stageData: ILinearData = {};
  dataStep1: any[] = [];
  dataStep2: any = {};

  T1 = 5;
  T2 = 4;
  H1 = 5;
  distance = 50;
  i = 0;
  constructor(private service: SwfServiceService) {
    this.getStep1Data();
  }
  nextData() {
    this.i = this.i + 1;
    this.stageData = this.dataStep1[this.i];
  }
  prevData() {
    this.i = this.i - 1;
    this.stageData = this.dataStep1[this.i];
  }
  nextPageData(ind) {
    this.i = ind;
    this.stageData = this.dataStep1[this.i];
  }
  getStep1Data() {
    this.service.getStep1Data().subscribe((res) => {
      this.dataStep1 = res as [];
      console.log(this.dataStep1);
      this.i = 0;
      this.stageData = this.dataStep1[this.i];
    });
  }
  getStep2Data() {
    this.service.getStep2Data().subscribe((res) => {
      this.dataStep1 = res as [];
      this.i = 0;
      this.stageData = this.dataStep1[this.i];
    });
  }

  nextDatas2() {
    this.i = this.i + 1;
    this.stageData = this.dataStep2[this.i];
  }
  nextPageData2(ind) {
    this.i = ind;
    this.stageData = this.dataStep2[this.i];
  }
  ngOnInit(): void {
   // this.t1Change();
  }

}
