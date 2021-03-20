import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingsComponent } from './kings.component';

describe('KingsComponent', () => {
  let component: KingsComponent;
  let fixture: ComponentFixture<KingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
