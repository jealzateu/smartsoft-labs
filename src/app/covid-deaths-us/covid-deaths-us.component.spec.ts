import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDeathsUSComponent } from './covid-deaths-us.component';

describe('CovidDeathsUSComponent', () => {
  let component: CovidDeathsUSComponent;
  let fixture: ComponentFixture<CovidDeathsUSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovidDeathsUSComponent]
    });
    fixture = TestBed.createComponent(CovidDeathsUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
