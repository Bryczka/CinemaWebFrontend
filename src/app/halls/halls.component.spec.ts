/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HallsComponent } from './halls.component';

describe('HallsComponent', () => {
  let component: HallsComponent;
  let fixture: ComponentFixture<HallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
