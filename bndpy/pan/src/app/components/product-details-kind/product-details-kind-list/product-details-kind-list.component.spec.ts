import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsKindListComponent } from './product-details-kind-list.component';

describe('ProductDetailsKindListComponent', () => {
  let component: ProductDetailsKindListComponent;
  let fixture: ComponentFixture<ProductDetailsKindListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsKindListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsKindListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
