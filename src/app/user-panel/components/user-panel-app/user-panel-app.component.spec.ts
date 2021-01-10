import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelAppComponent } from './user-panel-app.component';

describe('UserPanelAppComponent', () => {
  let component: UserPanelAppComponent;
  let fixture: ComponentFixture<UserPanelAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPanelAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
