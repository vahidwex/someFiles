import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKindNewComponent } from './product-kind-new.component';

describe('ProductKindNewComponent', () => {
  let component: ProductKindNewComponent;
  let fixture: ComponentFixture<ProductKindNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKindNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKindNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
