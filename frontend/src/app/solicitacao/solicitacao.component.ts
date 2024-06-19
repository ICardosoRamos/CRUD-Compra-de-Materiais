import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { ModalFiltrarSolicitacaoComponent } from './modal-filtrar-solicitacao/modal-filtrar-solicitacao.component';
import { ModalCriarNovaSolicitacaoComponent } from './modal-criar-solicitacao/modal-criar-solicitacao.component';
import { TData } from './helper';

type TSolicitacoes = {
  id: number;
  nomeSolicitante: string;
  descricaoItem: string;
  precoProduto: string;
};

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.scss',
})
export class SolicitacaoComponent implements OnInit {
  solicitacoes: TSolicitacoes[] = [];
  filtrosRetornados: TData = {
    nomeSolicitante: '',
    descricaoItem: '',
    precoProduto: '',
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // AQUI EU VOU FAZER A REQ PARA BUSCAR AS SOLICITACOES CRIADAS
    for (let index = 0; index < 14; index++) {
      this.solicitacoes.push({
        id: index + 1,
        nomeSolicitante: 'João Silva',
        descricaoItem: 'Laptop Dell',
        precoProduto: '$1200',
      });
    }
  }

  abrirModalFiltros(): void {
    const dialogRef = this.dialog.open(ModalFiltrarSolicitacaoComponent, {
      width: '250px',
      height: '450px',
      data: this.filtrosRetornados,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.filtrosRetornados = result;
        // Execute your filtering logic here
      }
      if (!result) {
        this.filtrosRetornados = {
          nomeSolicitante: '',
          descricaoItem: '',
          precoProduto: '',
        };
      }
    });
  }

  abrirModalCriarNova(): void {
    const dialogRef = this.dialog.open(ModalCriarNovaSolicitacaoComponent, {
      width: '250px',
      height: '360px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        console.log(result);
        // Execute your filtering logic here
      }
    });
  }
}
