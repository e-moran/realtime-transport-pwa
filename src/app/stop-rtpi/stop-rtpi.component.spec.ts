import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopRtpiComponent } from './stop-rtpi.component';

describe('StopRtpiComponent', () => {
  let component: StopRtpiComponent;
  let fixture: ComponentFixture<StopRtpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopRtpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopRtpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
