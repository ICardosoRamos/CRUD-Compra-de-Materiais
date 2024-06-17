import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule, MatCardModule],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.scss',
})
export class SolicitacaoComponent implements OnInit {
  solicitacoes = [
    {
      nomeSolicitante: 'João Silva',
      descricaoItem: 'Laptop Dell',
      precoProduto: '$1200',
    },
    {
      nomeSolicitante: 'Maria Oliveira',
      descricaoItem: 'Mouse Logitech',
      precoProduto: '$50',
    },
    {
      nomeSolicitante: 'João Silva',
      descricaoItem: 'Laptop Dell',
      precoProduto: '$1200',
    },
    {
      nomeSolicitante: 'Maria Oliveira',
      descricaoItem: 'Mouse Logitech',
      precoProduto: '$50',
    },
    // Adicione mais objetos conforme necessário
  ];

  constructor() {}

  ngOnInit(): void {}
}
