import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisoDetailComponent } from './piso-detail.component';

describe('PisoDetailComponent', () => {
  let component: PisoDetailComponent;
  let fixture: ComponentFixture<PisoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
