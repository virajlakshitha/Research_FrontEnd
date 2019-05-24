import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildForPriceComponent } from './build-for-price.component';

describe('BuildForPriceComponent', () => {
  let component: BuildForPriceComponent;
  let fixture: ComponentFixture<BuildForPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildForPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildForPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
