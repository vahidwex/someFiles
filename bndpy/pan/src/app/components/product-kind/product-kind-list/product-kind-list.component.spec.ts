import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKindListComponent } from './product-kind-list.component';

describe('ProductKindListComponent', () => {
  let component: ProductKindListComponent;
  let fixture: ComponentFixture<ProductKindListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKindListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKindListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
