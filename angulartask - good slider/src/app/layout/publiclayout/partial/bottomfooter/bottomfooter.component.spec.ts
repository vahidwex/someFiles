import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomfooterComponent } from './bottomfooter.component';

describe('BottomfooterComponent', () => {
  let component: BottomfooterComponent;
  let fixture: ComponentFixture<BottomfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
