import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProductsPage } from './verify-products.page';

describe('VerifyProductsPage', () => {
  let component: VerifyProductsPage;
  let fixture: ComponentFixture<VerifyProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
