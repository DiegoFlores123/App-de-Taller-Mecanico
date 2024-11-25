import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialInventarioPage } from './historial-inventario.page';

describe('HistorialInventarioPage', () => {
  let component: HistorialInventarioPage;
  let fixture: ComponentFixture<HistorialInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
