import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  instructionOpen: boolean = false;
  keyConceptOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  openInstruction() {
    this.instructionOpen=!this.instructionOpen;
  }
  openKeyConcept() {
    this.keyConceptOpen=!this.keyConceptOpen;
  }
  printPage() {
    window.print();
  }
}
