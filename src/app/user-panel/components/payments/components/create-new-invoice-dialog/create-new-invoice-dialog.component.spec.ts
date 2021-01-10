import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewInvoiceDialogComponent } from './create-new-invoice-dialog.component';

describe('CreateNewInvoiceDialogComponent', () => {
  let component: CreateNewInvoiceDialogComponent;
  let fixture: ComponentFixture<CreateNewInvoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewInvoiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
