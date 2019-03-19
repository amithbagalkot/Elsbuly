import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorRatingComponent } from './advisor-rating.component';

describe('AdvisorRatingComponent', () => {
  let component: AdvisorRatingComponent;
  let fixture: ComponentFixture<AdvisorRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
