import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingproductComponent } from './trendingproduct.component';

describe('TrendingproductComponent', () => {
  let component: TrendingproductComponent;
  let fixture: ComponentFixture<TrendingproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
