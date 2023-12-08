import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoyerComponent } from './show-foyer.component';

describe('ShowFoyerComponent', () => {
  let component: ShowFoyerComponent;
  let fixture: ComponentFixture<ShowFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
