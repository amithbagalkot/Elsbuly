import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaGenerateComponent } from './idea-generate.component';

describe('IdeaGenerateComponent', () => {
  let component: IdeaGenerateComponent;
  let fixture: ComponentFixture<IdeaGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
