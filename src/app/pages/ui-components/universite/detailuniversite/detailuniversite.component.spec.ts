import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailuniversiteComponent } from './detailuniversite.component';

describe('DetailuniversiteComponent', () => {
  let component: DetailuniversiteComponent;
  let fixture: ComponentFixture<DetailuniversiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailuniversiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailuniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
