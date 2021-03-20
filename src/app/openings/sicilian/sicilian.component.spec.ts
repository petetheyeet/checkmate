import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicilianComponent } from './sicilian.component';

describe('SicilianComponent', () => {
  let component: SicilianComponent;
  let fixture: ComponentFixture<SicilianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicilianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicilianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
