import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkActivityComponent } from './link-activity.component';

describe('LinkActivityComponent', () => {
  let component: LinkActivityComponent;
  let fixture: ComponentFixture<LinkActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
