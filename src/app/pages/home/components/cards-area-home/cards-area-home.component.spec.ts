/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsAreaHomeComponent } from './cards-area-home.component';

describe('CardsAreaHomeComponent', () => {
  let component: CardsAreaHomeComponent;
  let fixture: ComponentFixture<CardsAreaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardsAreaHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsAreaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
