import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinkDialogComponent } from './new-link-dialog.component';

describe('NewLinkDialogComponent', () => {
  let component: NewLinkDialogComponent;
  let fixture: ComponentFixture<NewLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
