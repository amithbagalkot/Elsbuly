import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderSubscriptionsComponent } from './trader-subscriptions.component';

describe('TraderSubscriptionsComponent', () => {
  let component: TraderSubscriptionsComponent;
  let fixture: ComponentFixture<TraderSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
