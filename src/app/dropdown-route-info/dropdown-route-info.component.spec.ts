import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRouteInfoComponent } from './dropdown-route-info.component';

describe('DropdownRouteInfoComponent', () => {
  let component: DropdownRouteInfoComponent;
  let fixture: ComponentFixture<DropdownRouteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownRouteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownRouteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
