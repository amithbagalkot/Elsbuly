import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionExitComponent } from './discussion-exit.component';

describe('DiscussionExitComponent', () => {
  let component: DiscussionExitComponent;
  let fixture: ComponentFixture<DiscussionExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
