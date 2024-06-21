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
import { HttpClient } from '@angular/common/http';
import { ModalAprovarSolicitacaoComponent } from './modal-aprovar-solicitacao/modal-aprovar-solicitacao.component';

type TSolicitacoes = {
  id: number;
  nome_solicitante: string;
  descricao_produto: string;
  preco: string;
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
    nome_solicitante: '',
    descricao_produto: '',
    preco: '',
    aprovado: '',
  };

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.handleGetSolicitacoes(this.filtrosRetornados);
  }

  handleGetSolicitacoes(filtros: any): void {
    this.filtrosRetornados = filtros;

    if (
      filtros.preco === 'R$ 0,00' ||
      filtros.preco === 0 ||
      filtros.preco === '0' ||
      filtros.preco === ''
    ) {
      filtros.preco = '';
    } else {
      let valorDesformatado = filtros.preco.replace(/[^\d,]/g, '');
      valorDesformatado = valorDesformatado.replace(',', '.');
      filtros.preco = parseFloat(valorDesformatado);
    }

    if (filtros.aprovado === 'Tudo') {
      filtros.aprovado = '';
    }

    this.http
      .get<TSolicitacoes[]>('http://localhost:9800/api/solicitacoes', {
        params: { ...filtros },
      })
      .subscribe((solicitacoes) => {
        this.solicitacoes = solicitacoes;
      });
  }

  abrirModalFiltros(): void {
    const dialogRef = this.dialog.open(ModalFiltrarSolicitacaoComponent, {
      width: '250px',
      height: '460px',
      data: this.filtrosRetornados,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'limpar') {
        this.filtrosRetornados = {
          nome_solicitante: '',
          descricao_produto: '',
          preco: '',
          aprovado: '',
        };

        return this.handleGetSolicitacoes({
          nome_solicitante: '',
          descricao_produto: '',
          preco: '',
          aprovado: '',
        });
      }

      this.filtrosRetornados = { ...result };

      if (result) {
        return this.handleGetSolicitacoes({
          ...result,
        });
      }

      if (!result) {
        return this.handleGetSolicitacoes({
          nome_solicitante: '',
          descricao_produto: '',
          preco: '',
          aprovado: '',
        });
      }
    });
  }

  abrirModalCriarNova(): void {
    const dialogRef = this.dialog.open(ModalCriarNovaSolicitacaoComponent, {
      width: '250px',
      height: '360px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.nome_solicitante && result.descricao_produto && result.preco) {
        if (
          result.preco === 'R$ 0,00' ||
          result.preco === 0 ||
          result.preco === '0' ||
          result.preco === ''
        ) {
          result.preco = '';
        } else {
          let valorDesformatado = result.preco.replace(/[^\d,]/g, '');
          valorDesformatado = valorDesformatado.replace(',', '.');
          result.preco = parseFloat(valorDesformatado);
        }

        this.http
          .post('http://localhost:9800/api/solicitacoes', result)
          .subscribe((result) => {
            return this.http
              .get<TSolicitacoes[]>('http://localhost:9800/api/solicitacoes', {
                params: {
                  ...{
                    nome_solicitante: '',
                    descricao_produto: '',
                    preco: '',
                    aprovado: '',
                  },
                },
              })
              .subscribe((solicitacoes) => {
                this.solicitacoes = solicitacoes;
              });
          });
      }
      return;
    });
  }

  abrirModalAprovacao(data: any): void {
    const dialogRef = this.dialog.open(ModalAprovarSolicitacaoComponent, {
      width: '250px',
      height: '390px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .put(`http://localhost:9800/api/solicitacoes/${result.id}`, {
            aprovado: result.aprovado,
          })
          .subscribe((result) => {
            console.log(result);
          });
      }
    });
  }
}
