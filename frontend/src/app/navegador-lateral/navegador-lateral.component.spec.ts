import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorLateralComponent } from './navegador-lateral.component';

describe('NavegadorLateralComponent', () => {
  let component: NavegadorLateralComponent;
  let fixture: ComponentFixture<NavegadorLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavegadorLateralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegadorLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
