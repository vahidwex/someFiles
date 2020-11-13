import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsKindEditComponent } from './product-details-kind-edit.component';

describe('ProductDetailsKindEditComponent', () => {
  let component: ProductDetailsKindEditComponent;
  let fixture: ComponentFixture<ProductDetailsKindEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsKindEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsKindEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
