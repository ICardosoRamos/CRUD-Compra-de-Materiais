import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TData } from '../helper';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from '../../currency-mask.directive';

@Component({
  selector: 'app-modal-criar-nova-solicitacao',
  templateUrl: 'modal-criar-solicitacao.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    CurrencyMaskDirective,
  ],
  styleUrl: './modal-criar-solicitacao.component.scss',
})
export class ModalCriarNovaSolicitacaoComponent {
  data: TData = {
    nome_solicitante: '',
    descricao_produto: '',
    preco: '',
    aprovado: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ModalCriarNovaSolicitacaoComponent>
  ) {}

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

    this.data.preco = valor_final;
  }

  handleChangeFiltros(
    event: Event,
    key: 'nome_solicitante' | 'descricao_produto' | 'preco'
  ) {
    const target = event.target as HTMLInputElement;
    this.data[key] = target.value;
  }

  criar() {
    this.dialogRef.close({ ...this.data });
  }
}
