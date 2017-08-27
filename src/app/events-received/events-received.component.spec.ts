import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReceivedComponent } from './events-received.component';

describe('EventsReceivedComponent', () => {
  let component: EventsReceivedComponent;
  let fixture: ComponentFixture<EventsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
