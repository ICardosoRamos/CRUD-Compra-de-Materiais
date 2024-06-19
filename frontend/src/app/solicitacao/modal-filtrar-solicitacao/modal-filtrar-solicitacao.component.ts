import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TData } from '../helper';

@Component({
  selector: 'app-modal-filtrar-solicitacao',
  templateUrl: './modal-filtrar-solicitacao.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './modal-filtrar-solicitacao.component.scss',
})
export class ModalFiltrarSolicitacaoComponent implements OnInit {
  filtros: TData = {
    nomeSolicitante: '',
    descricaoItem: '',
    precoProduto: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ModalFiltrarSolicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TData
  ) {}

  ngOnInit(): void {
    this.filtros = this.data;
  }

  handleChangeFiltros(
    event: Event,
    key: 'nomeSolicitante' | 'descricaoItem' | 'precoProduto'
  ) {
    console.log(1);
    const target = event.target as HTMLInputElement;
    this.filtros[key] = target.value;
  }

  filtrar() {
    this.dialogRef.close({ ...this.filtros });
  }

  limparFiltros() {
    this.dialogRef.close(null);
  }
}
