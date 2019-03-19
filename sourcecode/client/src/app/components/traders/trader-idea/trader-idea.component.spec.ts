import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderIdeaComponent } from './trader-idea.component';

describe('TraderIdeaComponent', () => {
  let component: TraderIdeaComponent;
  let fixture: ComponentFixture<TraderIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
