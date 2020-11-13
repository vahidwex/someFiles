import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSolutionKindComponent } from './selected-solution-kind.component';

describe('SelectedSolutionKindComponent', () => {
  let component: SelectedSolutionKindComponent;
  let fixture: ComponentFixture<SelectedSolutionKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSolutionKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSolutionKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
