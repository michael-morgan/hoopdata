import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanderPage } from './lander.page';

describe('LanderPage', () => {
  let component: LanderPage;
  let fixture: ComponentFixture<LanderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
