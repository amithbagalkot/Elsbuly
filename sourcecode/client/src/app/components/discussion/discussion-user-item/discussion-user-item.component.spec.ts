import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionUserItemComponent } from './discussion-user-item.component';

describe('DiscussionUserItemComponent', () => {
  let component: DiscussionUserItemComponent;
  let fixture: ComponentFixture<DiscussionUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
