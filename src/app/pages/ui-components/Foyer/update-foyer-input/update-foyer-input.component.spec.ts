import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFoyerInputComponent } from './update-foyer-input.component';

describe('UpdateFoyerInputComponent', () => {
  let component: UpdateFoyerInputComponent;
  let fixture: ComponentFixture<UpdateFoyerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFoyerInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFoyerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
