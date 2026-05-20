/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Register_employeeComponent } from './register_employee.component';

describe('Register_employeeComponent', () => {
  let component: Register_employeeComponent;
  let fixture: ComponentFixture<Register_employeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register_employeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register_employeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
