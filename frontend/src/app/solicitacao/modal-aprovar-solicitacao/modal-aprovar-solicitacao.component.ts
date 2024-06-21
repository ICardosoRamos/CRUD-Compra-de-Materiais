import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-aprovar-solicitacao',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './modal-aprovar-solicitacao.component.html',
  styleUrl: './modal-aprovar-solicitacao.component.scss',
})
export class ModalAprovarSolicitacaoComponent {
  dataReceived: any = {
    id: null,
    nome_solicitante: '',
    descricao_produto: '',
    preco: 0,
    aprovado: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ModalAprovarSolicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dataReceived = { ...this.data };
  }

  aprovar(): void {
    this.dialogRef.close({ aprovado: true, id: this.dataReceived.ID });
  }

  reprovar(): void {
    this.dialogRef.close({ aprovado: false, id: this.dataReceived.ID });
  }

  formataValor(preco: string): string {
    preco = String(preco);

    const value = preco.replace(/[^0-9.,]/g, '');
    const normalizedValue = value.replace(',', '.');
    const valueInFloat = parseFloat(normalizedValue);

    const valor_final = valueInFloat.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return valor_final;
  }
}
