import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingPage } from './shooting.page';

describe('ShootingPage', () => {
  let component: ShootingPage;
  let fixture: ComponentFixture<ShootingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShootingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
