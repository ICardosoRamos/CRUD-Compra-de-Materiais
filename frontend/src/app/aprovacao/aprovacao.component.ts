import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aprovacao',
  standalone: true,
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AprovacaoComponent implements OnInit {
  aprovacaoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.aprovacaoForm = this.fb.group({
      nome: [{ value: '', disabled: true }],
      descricao: [{ value: '', disabled: true }],
      preco: [{ value: '', disabled: true }],
      status: ['', Validators.required],
      observacoes: [''],
    });

    // Carregar dados da solicitação para aprovação (substitua com seu código)
    const solicitacao = {
      nome: 'Teste',
      descricao: 'Item Teste',
      preco: '100,00',
      status: '',
      observacoes: '',
    };
    this.aprovacaoForm.patchValue(solicitacao);
  }

  onSubmit() {
    if (this.aprovacaoForm.valid) {
      // Chamar o serviço para enviar a aprovação
    }
  }
}
