import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionUserListComponent } from './discussion-user-list.component';

describe('DiscussionUserListComponent', () => {
  let component: DiscussionUserListComponent;
  let fixture: ComponentFixture<DiscussionUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
