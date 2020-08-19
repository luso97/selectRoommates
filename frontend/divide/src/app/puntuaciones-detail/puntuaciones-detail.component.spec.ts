import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionesDetailComponent } from './puntuaciones-detail.component';

describe('PuntuacionesDetailComponent', () => {
  let component: PuntuacionesDetailComponent;
  let fixture: ComponentFixture<PuntuacionesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuacionesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
