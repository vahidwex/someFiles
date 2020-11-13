import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsEditComponent } from './product-details-edit.component';

describe('ProductDetailsEditComponent', () => {
  let component: ProductDetailsEditComponent;
  let fixture: ComponentFixture<ProductDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
