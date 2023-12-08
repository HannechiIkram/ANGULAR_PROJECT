import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowuniversiteComponent } from './showuniversite.component';

describe('ShowuniversiteComponent', () => {
  let component: ShowuniversiteComponent;
  let fixture: ComponentFixture<ShowuniversiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowuniversiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowuniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
