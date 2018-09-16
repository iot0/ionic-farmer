import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFarmerPage } from './register-farmer.page';

describe('RegisterFarmerPage', () => {
  let component: RegisterFarmerPage;
  let fixture: ComponentFixture<RegisterFarmerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFarmerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFarmerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
