import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteDetallePage } from './cliente-detalle.page';

describe('ClienteDetallePage', () => {
  let component: ClienteDetallePage;
  let fixture: ComponentFixture<ClienteDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
