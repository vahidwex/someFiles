import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesByProductsComponent } from './features-by-products.component';

describe('FeaturesByProductsComponent', () => {
  let component: FeaturesByProductsComponent;
  let fixture: ComponentFixture<FeaturesByProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesByProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesByProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
