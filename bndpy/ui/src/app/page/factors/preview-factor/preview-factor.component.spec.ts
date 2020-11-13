import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFactorComponent } from './preview-factor.component';

describe('PreviewFactorComponent', () => {
  let component: PreviewFactorComponent;
  let fixture: ComponentFixture<PreviewFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
