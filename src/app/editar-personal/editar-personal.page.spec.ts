import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPersonalPage } from './editar-personal.page';

describe('EditarPersonalPage', () => {
  let component: EditarPersonalPage;
  let fixture: ComponentFixture<EditarPersonalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
