import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueensComponent } from './queens.component';

describe('QueensComponent', () => {
  let component: QueensComponent;
  let fixture: ComponentFixture<QueensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
