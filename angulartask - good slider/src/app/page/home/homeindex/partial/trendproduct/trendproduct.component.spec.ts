import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendproductComponent } from './trendproduct.component';

describe('TrendproductComponent', () => {
  let component: TrendproductComponent;
  let fixture: ComponentFixture<TrendproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
