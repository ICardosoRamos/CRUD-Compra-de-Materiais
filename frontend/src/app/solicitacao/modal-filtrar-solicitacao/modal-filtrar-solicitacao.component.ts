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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CurrencyMaskDirective } from '../../currency-mask.directive';

@Component({
  selector: 'app-modal-filtrar-solicitacao',
  templateUrl: './modal-filtrar-solicitacao.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatAutocompleteModule,
    FormsModule,
    CurrencyMaskDirective,
  ],
  styleUrl: './modal-filtrar-solicitacao.component.scss',
})
export class ModalFiltrarSolicitacaoComponent implements OnInit {
  filtros: TData = {
    nome_solicitante: '',
    descricao_produto: '',
    preco: '',
    aprovado: '',
  };

  options: string[] = ['Tudo', 'Aprovadas', 'Reprovadas'];

  constructor(
    public dialogRef: MatDialogRef<ModalFiltrarSolicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TData
  ) {}

  ngOnInit(): void {
    let valorFinal = '';

    if (this.data.preco) {
      const preco = String(this.data.preco);

      const value = preco.replace(/[^0-9.,]/g, '');
      const normalizedValue = value.replace(',', '.');
      const valueInFloat = parseFloat(normalizedValue);

      valorFinal = valueInFloat.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    this.filtros = { ...this.data, preco: String(valorFinal) || '' };
  }

  formatarPreco(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (
      target.value === 'R$ 0,0' ||
      target.value === 'R$0,00' ||
      target.value === '$ 0,00' ||
      target.value === 'R$ ,00' ||
      target.value === 'R$ 000' ||
      target.value === 'R 0,00'
    ) {
      this.data.preco = 'R$ 0,00';
      return;
    }

    const value = target.value.replace(/[^0-9]/g, '');

    const valueInCents = parseInt(value, 10);
    const valueInReais = valueInCents / 100;

    const valor_final = valueInReais.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    this.filtros.preco = valor_final;
  }

  onOptionChange(value: string) {
    this.filtros.aprovado = value;
  }

  handleChangeFiltros(
    event: Event,
    key: 'nome_solicitante' | 'descricao_produto' | 'preco' | 'aprovado'
  ) {
    const target = event.target as HTMLInputElement;

    return (this.filtros[key] = target.value);
  }

  filtrar() {
    this.dialogRef.close({ ...this.filtros });
  }

  limparFiltros() {
    this.dialogRef.close('limpar');
  }
}
