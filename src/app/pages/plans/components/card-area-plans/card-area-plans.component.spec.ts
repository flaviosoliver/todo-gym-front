/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardAreaPlansComponent } from './card-area-plans.component';

describe('CardAreaPlansComponent', () => {
  let component: CardAreaPlansComponent;
  let fixture: ComponentFixture<CardAreaPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAreaPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAreaPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
