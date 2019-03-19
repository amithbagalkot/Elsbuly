import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdealistComponent } from './idea-list.component';

describe('IdealistComponent', () => {
  let component: IdealistComponent;
  let fixture: ComponentFixture<IdealistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdealistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdealistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
