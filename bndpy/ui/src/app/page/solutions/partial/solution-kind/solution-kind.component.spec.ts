import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionKindComponent } from './solution-kind.component';

describe('SolutionKindComponent', () => {
  let component: SolutionKindComponent;
  let fixture: ComponentFixture<SolutionKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
