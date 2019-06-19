import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopProductsComponent } from './laptop-products.component';

describe('LaptopProductsComponent', () => {
  let component: LaptopProductsComponent;
  let fixture: ComponentFixture<LaptopProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
