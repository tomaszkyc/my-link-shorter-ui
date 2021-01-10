import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToPaymentProviderComponent } from './redirect-to-payment-provider.component';

describe('RedirectToPaymentProviderComponent', () => {
  let component: RedirectToPaymentProviderComponent;
  let fixture: ComponentFixture<RedirectToPaymentProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectToPaymentProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToPaymentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
