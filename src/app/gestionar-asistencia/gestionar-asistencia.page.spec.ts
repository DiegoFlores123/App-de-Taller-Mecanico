import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarAsistenciaPage } from './gestionar-asistencia.page';

describe('GestionarAsistenciaPage', () => {
  let component: GestionarAsistenciaPage;
  let fixture: ComponentFixture<GestionarAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
