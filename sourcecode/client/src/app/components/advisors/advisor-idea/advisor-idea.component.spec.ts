import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorIdeaComponent } from './advisor-idea.component';

describe('AdvisorIdeaComponent', () => {
  let component: AdvisorIdeaComponent;
  let fixture: ComponentFixture<AdvisorIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
