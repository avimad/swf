import { Component, OnInit } from '@angular/core';
import * as JXG from 'jsxgraph';
import { toUnicode } from 'punycode';
import { ILinearData } from 'src/app/models/data';
import { SwfServiceService } from 'src/app/services/swf-service.service';

@Component({
  selector: 'app-tortoise-hare',
  templateUrl: './tortoise-hare.component.html',
  styleUrls: ['./tortoise-hare.component.css'],
})
export class TortoiseHareComponent implements OnInit {
  board: any = {};

  T1 = 5;
  T2 = 4;
  H1 = 5;
  distance = 50;

  hareImgSrc = 'assets/images/tortoise/4.svg';
  torImgSrc = 'assets/images/tortoise/12.svg';

  stageData: ILinearData = {};
  dataStep1: any[] = [];
  dataStep2: any = {};
  i = 0;
  constructor(private service: SwfServiceService) {
    this.getStep1Data();
  }
  nextData() {
    this.i = this.i + 1;
    this.stageData = this.dataStep1[this.i];
  }
  prevData(){
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
  }

  t1Change() {
    this.board = JXG.JSXGraph.initBoard('box', {
      boundingbox: [-5, 50, 30, -5],
      axis: true,
      showNavigation: true,
      zoom: {
        factorX: 5,
        factorY: 5,
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
        [0, this.T1],
        [(this.distance - 1) / this.T2, 50],
      ],
      {
        name: 'l1',
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        fixed: true,
      }
    );

    this.board.create(
      'line',
      [
        [0, 0],
        [this.distance / this.H1, 50],
      ],
      {
        name: 'l2',
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        strokeColor: '#00ff00',
        fixed: true,
      }
    );
    this.board.create('intersection', ['l1', 'l2', 0], {
      name: 'intersection',
      withLabel: true,
    });

    const tortoise = document.getElementById('tortoise');
    tortoise.style.left = this.T1 * 10 + 'px';
  }

  interval() {
    let tt1 = this.T1;
    let tt2 = (this.distance - 1) / this.T2 + 0.1;
    setInterval(() => {
      //  this.t1Change();
      tt1 = tt1 + 0.1;
      tt2 = tt2 + 0.1;
      console.log(tt1, tt2);
      this.board.create('point', [tt2, 50], { name: 'A', size: 4 });
    }, 1000);
  }

  simulation() {
    this.hareImgSrc = 'assets/images/tortoise/runnig-hare.gif';
    this.torImgSrc = 'assets/images/tortoise/runnig-tortoise.gif';
    const tortoise = document.getElementById('tortoise');
    const hare = document.getElementById('hare');
    tortoise.style.left = '500px';
    hare.style.left = '500px';
  }
}
