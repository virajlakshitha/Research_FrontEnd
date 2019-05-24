import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopComparisonComponent } from './laptop-comparison.component';

describe('LaptopComparisonComponent', () => {
  let component: LaptopComparisonComponent;
  let fixture: ComponentFixture<LaptopComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
