import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFoyerComponent } from './detail-foyer.component';

describe('DetailFoyerComponent', () => {
  let component: DetailFoyerComponent;
  let fixture: ComponentFixture<DetailFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
