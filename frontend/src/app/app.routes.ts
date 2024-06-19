import { Routes } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/solicitacoes', pathMatch: 'full' },
  {
    path: 'solicitacoes',
    component: SolicitacaoComponent,
    title: 'Solicitações',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Página não encontrada!',
  },
];
