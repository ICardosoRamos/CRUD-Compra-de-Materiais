import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TData } from '../helper';

@Component({
  selector: 'app-modal-criar-nova-solicitacao',
  templateUrl: 'modal-criar-solicitacao.component.html',
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
  styleUrl: './modal-criar-solicitacao.component.scss',
})
export class ModalCriarNovaSolicitacaoComponent {
  data: TData = {
    nomeSolicitante: '',
    descricaoItem: '',
    precoProduto: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ModalCriarNovaSolicitacaoComponent>
  ) {}

  handleChangeFiltros(
    event: Event,
    key: 'nomeSolicitante' | 'descricaoItem' | 'precoProduto'
  ) {
    const target = event.target as HTMLInputElement;
    this.data[key] = target.value;
  }

  criar() {
    this.dialogRef.close({ ...this.data });
  }
}
