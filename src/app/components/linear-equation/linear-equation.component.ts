import { Component, OnInit } from '@angular/core';
import { ILinearData } from 'src/app/models/data';
import { SwfServiceService } from 'src/app/services/swf-service.service';
import * as JXG from 'jsxgraph';

@Component({
  selector: 'app-linear-equation',
  templateUrl: './linear-equation.component.html',
  styleUrls: ['./linear-equation.component.css'],
})
export class LinearEquationComponent implements OnInit {
  board: any = {};
  stageData: ILinearData = {};
  dataStep1: any[] = [];
  dataStep2: any = {};
  btnActive = "<";
  showSolution=false;
  condValid = false;

  mData = 1;
  bData = 3;
  xData = 0.00;
  yData = 0.00;
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
    this.t1Change();
    this.checkConditionValid();
  }
  t1Change() {
    this.xData = this.mData;
    this.yData = this.xData + this.bData;
    this.board = JXG.JSXGraph.initBoard('box', {
      boundingbox: [-5, 10, 10, -5],
      axis: true,
      showNavigation: true,
      zoom: {
        factorX: 2,
        factorY: 2,
        wheel: true,
        needshift: true,
        eps: 0.1,
      },
    });

    // this.board.create('point', [this.T1, this.T2], { name: 'A', size: 4 });
    //  this.board.create('point', [0, 5], { name: 'B', size: 4 });
    this.board.create(
      'line',
      [
        [-this.xData, -this.yData],
        [this.xData, this.yData],
      ],
      {
        name: 'l1',
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        fixed: true,
      }
    );

    // this.board.create(
    //   'line',
    //   [
    //     [0, 0],
    //     [this.distance / this.H1, 50],
    //   ],
    //   {
    //     name: 'l2',
    //     straightFirst: false,
    //     straightLast: false,
    //     strokeWidth: 2,
    //     strokeColor: '#00ff00',
    //     fixed: true,
    //   }
    // );
    // this.board.create('intersection', ['l1', 'l2', 0], {
    //   name: 'intersection',
    //   withLabel: true,
    // });

    // const tortoise = document.getElementById('tortoise');
    // tortoise.style.left = this.T1 * 10 + 'px';
  }

  selectedbtn(selectedType) {
    switch(selectedType) {
      case '<=': 
        this.btnActive = '<=';
        this.checkConditionValid();
        break;
      case '<':
        this.btnActive = '<';
        this.checkConditionValid();
        break;
      case '=':
        this.btnActive = '='; 
        this.checkConditionValid();
        break;
      case '>': 
        this.btnActive = '>';
        this.checkConditionValid();
        break;
      case '>=':
        this.btnActive = '>=';
        this.checkConditionValid();
        break;
    }
  }

  checkConditionValid() {
    const val = ((this.mData * 0.00) + this.bData);
    switch(this.btnActive) {
      case '<=': 
        (0.00 <= val) ? this.condValid= true : this.condValid = false;
        break;
      case '<':
        (0.00 < val) ? this.condValid= true : this.condValid = false;
        break;
      case '=':
        (0.00 == val) ? this.condValid= true : this.condValid = false;
        break;
      case '>': 
        (0.00 > val) ? this.condValid= true : this.condValid = false;
        break;
      case '>=':
        (0.00 >= val) ? this.condValid= true : this.condValid = false;
        break;
    }
  }
}
