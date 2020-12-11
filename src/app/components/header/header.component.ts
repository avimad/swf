import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  instructionOpen: boolean = false;
  keyConceptOpen: boolean = false;
  header: string;
  constructor(private router: Router) { }

  ngOnInit() {
    var url = window.location.href.split("/");
    var currentUrl = url[url.length - 1];
    this.header = currentUrl === "MAT11NA_09_06_06_005" ? "Systems of Linear Inequalities" : "Modeling Linear System"
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
