import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioFormPage } from './inventario-form.page';

describe('InventarioFormPage', () => {
  let component: InventarioFormPage;
  let fixture: ComponentFixture<InventarioFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
