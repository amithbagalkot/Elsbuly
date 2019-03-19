import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderIdeasComponent } from './trader-ideas.component';

describe('TraderIdeasComponent', () => {
  let component: TraderIdeasComponent;
  let fixture: ComponentFixture<TraderIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
