import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearEquationComponent } from './linear-equation.component';

describe('LinearEquationComponent', () => {
  let component: LinearEquationComponent;
  let fixture: ComponentFixture<LinearEquationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearEquationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearEquationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
