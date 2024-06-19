import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto3FormComponent } from './punto3-form.component';

describe('Punto3FormComponent', () => {
  let component: Punto3FormComponent;
  let fixture: ComponentFixture<Punto3FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto3FormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Punto3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
