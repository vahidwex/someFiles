import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoersonalDataComponent } from './poersonal-data.component';

describe('PoersonalDataComponent', () => {
  let component: PoersonalDataComponent;
  let fixture: ComponentFixture<PoersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
