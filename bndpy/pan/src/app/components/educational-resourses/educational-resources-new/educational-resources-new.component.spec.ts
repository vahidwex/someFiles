import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalResourcesNewComponent } from './educational-resources-new.component';

describe('EducationalResourcesNewComponent', () => {
  let component: EducationalResourcesNewComponent;
  let fixture: ComponentFixture<EducationalResourcesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalResourcesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalResourcesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
