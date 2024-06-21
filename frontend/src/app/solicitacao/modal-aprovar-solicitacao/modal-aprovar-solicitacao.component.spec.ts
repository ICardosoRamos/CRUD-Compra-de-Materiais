import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprovarSolicitacaoComponent } from './modal-aprovar-solicitacao.component';

describe('ModalAprovarSolicitacaoComponent', () => {
  let component: ModalAprovarSolicitacaoComponent;
  let fixture: ComponentFixture<ModalAprovarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAprovarSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAprovarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
