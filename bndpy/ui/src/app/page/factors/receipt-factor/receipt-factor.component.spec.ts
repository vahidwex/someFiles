import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFactorComponent } from './receipt-factor.component';

describe('ReceiptFactorComponent', () => {
  let component: ReceiptFactorComponent;
  let fixture: ComponentFixture<ReceiptFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
