import { Component, OnInit } from '@angular/core';
import * as JXG from 'jsxgraph';
import { toUnicode } from 'punycode';
import { ILinearData, ItortoiseTable } from 'src/app/models/data';
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
  tMin = 0.0;
  tMax = 5.0;
  tStep = 0.1;
  distance = 50;
  torDistance = 0;
  hareDistance = 0;

  isShowButton = true;
  isReset = false;
  tTable: ItortoiseTable[] = [];
  tTableSingle: ItortoiseTable = {};

  isControl = true;
  isTable = false;
  isStep1 = false;
  isStep2 = false;

  hareImgSrc = 'assets/images/tortoise/4.svg';
  torImgSrc = 'assets/images/tortoise/12.svg';

  stageData: ILinearData = {};
  dataStep1: any[] = [];
  dataStep2: any = {};
  i = 0;

  isToggle = false;
  constructor(private service: SwfServiceService) {
    this.getStep1Data();
  }
  openCity(name) {
    var btnContainer = document.getElementById(name);
    var btns = btnContainer.getElementsByClassName('tablinks');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
      });
    }
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
      this.isStep1 = true;
      this.isStep2 = false;
      this.i = 0;
      this.stageData = this.dataStep1[this.i];
    });
  }
  getStep2Data() {
    this.service.getStep2Data().subscribe((res) => {
      this.dataStep1 = res as [];
      this.isStep1 = false;
      this.isStep2 = true;
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
    this.tTableSingle.tMin = this.tMin;
    this.tTableSingle.tMax = this.tMax;
    this.tTableSingle.tStep = this.tStep;
    this.tTable.push(this.tTableSingle);
    this.t1Change();
    // this.openCity('Controls');
    for (let index = 0; index < 50; index++) {
      console.log(index);
      this.tTableSingle.tMin = this.tTableSingle.tMin + this.tStep;
      this.tTableSingle.tMax =
        this.tTableSingle.tMax + this.tTableSingle.tMax * this.tStep;
      this.tTableSingle.tStep = this.tMin;

      const data = Object.assign({}, this.tTableSingle);
      this.tTable.push(data);
    }
    console.log(this.tTable);
    this.reset();
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
        [(this.distance - this.T1) / this.T2, 50],
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
    this.isShowButton = false;
    this.torDistance = this.tMax;
    this.hareDistance = this.tMin;
    const Ttime = (50 - this.T1) / this.T2;
    const Htime = 50 / this.H1;

    const simTime = Ttime > Htime ? Htime : Ttime;
    this.hareImgSrc = 'assets/images/tortoise/runnig-hare.gif';
    this.torImgSrc = 'assets/images/tortoise/runnig-tortoise.gif';
    const tortoise = document.getElementById('tortoise');
    const tortoiseTooltip = document.getElementById('tortoise_tooltip');
    const hareTooltip = document.getElementById('hare_tooltip');

    const hare = document.getElementById('hare');

    tortoise.style.transition = `left ${Ttime}s cubic-bezier(0, 0, 1, 1)`;
    tortoiseTooltip.style.transition = `left ${Ttime}s cubic-bezier(0, 0, 1, 1)`;
    hareTooltip.style.transition = `left ${Htime}s cubic-bezier(0, 0, 1, 1)`;

    tortoise.style.left = '500px';
    tortoiseTooltip.style.left = '500px';
    hare.style.left = '500px';
    hareTooltip.style.left = '500px';

    const sss = setInterval(() => {
      this.torDistance = this.torDistance + this.tStep;
      this.hareDistance = this.hareDistance + this.tStep;
      if (this.torDistance == 50) {
        clearInterval(sss);
      }
    }, this.tStep * 100);

    setTimeout(() => {
      this.isShowButton = true;
      this.isReset = true;
      this.torImgSrc = 'assets/images/tortoise/12.svg';
      tortoise.style.transition = ``;
      tortoiseTooltip.style.transition = ``;
      hareTooltip.style.transition = ``;
      clearInterval(sss);
    }, simTime * 1000);

    setTimeout(() => {
      this.isShowButton = true;
      this.isReset = true;
      this.hareImgSrc = 'assets/images/tortoise/4.svg';
      hare.style.transition = ``;
    }, simTime * 1000);
  }

  reset() {
    this.torImgSrc = 'assets/images/tortoise/12.svg';
    this.hareImgSrc = 'assets/images/tortoise/4.svg';
    const tortoise = document.getElementById('tortoise');
    const tortoiseTooltip = document.getElementById('tortoise_tooltip');
    const hareTooltip = document.getElementById('hare_tooltip');

    const hare = document.getElementById('hare');
    tortoise.style.transition = ``;
    tortoiseTooltip.style.transition = ``;
    hareTooltip.style.transition = ``;
    hare.style.transition = ``;

    tortoise.style.left = this.T1 * 10 + 'px';
    tortoiseTooltip.style.left = this.T1 * 10 + 'px';
    this.torDistance = this.tMax;
    this.hareDistance = this.tMin;

    hare.style.left = '0px';
    this.isReset = false;
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
}
