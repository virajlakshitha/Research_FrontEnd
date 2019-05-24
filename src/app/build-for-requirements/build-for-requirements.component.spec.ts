import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildForRequirementsComponent } from './build-for-requirements.component';

describe('BuildForRequirementsComponent', () => {
  let component: BuildForRequirementsComponent;
  let fixture: ComponentFixture<BuildForRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildForRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildForRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
