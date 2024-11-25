import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPersonalPage } from './registrar-personal.page';

describe('RegistrarPersonalPage', () => {
  let component: RegistrarPersonalPage;
  let fixture: ComponentFixture<RegistrarPersonalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
