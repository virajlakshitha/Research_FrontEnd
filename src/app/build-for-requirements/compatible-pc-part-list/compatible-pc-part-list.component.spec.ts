import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatiblePcPartListComponent } from './compatible-pc-part-list.component';

describe('CompatiblePcPartListComponent', () => {
  let component: CompatiblePcPartListComponent;
  let fixture: ComponentFixture<CompatiblePcPartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompatiblePcPartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatiblePcPartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
