import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalResourcesComponent } from './educational-resources.component';

describe('EducationalResourcesComponent', () => {
  let component: EducationalResourcesComponent;
  let fixture: ComponentFixture<EducationalResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
