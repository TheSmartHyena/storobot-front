import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorobotComponent } from './storobot.component';

describe('StorobotComponent', () => {
  let component: StorobotComponent;
  let fixture: ComponentFixture<StorobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
