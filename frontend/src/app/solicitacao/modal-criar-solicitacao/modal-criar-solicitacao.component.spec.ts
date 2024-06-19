import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarSolicitacaoComponent } from './modal-criar-solicitacao.component';

describe('ModalCriarSolicitacaoComponent', () => {
  let component: ModalCriarSolicitacaoComponent;
  let fixture: ComponentFixture<ModalCriarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCriarSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCriarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
