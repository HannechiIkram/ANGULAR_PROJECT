import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPdfReservationComponent } from './export-pdf-reservation.component';

describe('ExportPdfReservationComponent', () => {
  let component: ExportPdfReservationComponent;
  let fixture: ComponentFixture<ExportPdfReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPdfReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportPdfReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
