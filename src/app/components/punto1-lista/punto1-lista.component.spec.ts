import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto1ListaComponent } from './punto1-lista.component';

describe('Punto1ListaComponent', () => {
  let component: Punto1ListaComponent;
  let fixture: ComponentFixture<Punto1ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto1ListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Punto1ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
