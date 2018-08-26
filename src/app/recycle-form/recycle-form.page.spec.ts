import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleFormPage } from './recycle-form.page';

describe('RecycleFormPage', () => {
  let component: RecycleFormPage;
  let fixture: ComponentFixture<RecycleFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
