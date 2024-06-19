import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltrarSolicitacaoComponent } from './modal-filtrar-solicitacao.component';

describe('ModalFiltrarSolicitacaoComponent', () => {
  let component: ModalFiltrarSolicitacaoComponent;
  let fixture: ComponentFixture<ModalFiltrarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltrarSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFiltrarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
