import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  template: `
    <app-header [title]="'Lista de Solicitações'"></app-header>
    <main>
      <div class="main-content">
        <form (ngSubmit)="onSubmit()" [formGroup]="solicitacaoForm">
          <label for="nome">Nome do Solicitante:</label>
          <input id="nome" formControlName="nome" />

          <label for="descricao">Descrição do Item:</label>
          <input id="descricao" formControlName="descricao" />

          <label for="preco">Preço do Produto:</label>
          <input id="preco" formControlName="preco" />

          <button type="submit" [disabled]="solicitacaoForm.invalid">
            Enviar Solicitação
          </button>
        </form>
      </div>
    </main>
  `,
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  solicitacaoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.solicitacaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.pattern(/^\d+,\d{2}$/)]],
    });
  }

  onSubmit() {
    if (this.solicitacaoForm.valid) {
      // Chamar o serviço para enviar a solicitação
    }
  }
}
