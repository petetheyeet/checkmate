import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BongcloudComponent } from './bongcloud.component';

describe('BongcloudComponent', () => {
  let component: BongcloudComponent;
  let fixture: ComponentFixture<BongcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BongcloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BongcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
