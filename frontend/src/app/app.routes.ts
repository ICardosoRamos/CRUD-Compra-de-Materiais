import { Routes } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { AprovacaoComponent } from './aprovacao/aprovacao.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateComponent } from './solicitacao/create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'solicitacoes/create',
    component: CreateComponent,
    title: 'Criar Solicitação',
  },
  {
    path: 'solicitacoes/list',
    component: SolicitacaoComponent,
    title: 'Solicitações',
  },
  { path: 'aprovacoes', component: AprovacaoComponent, title: 'Aprovações' },
  { path: 'consultas', component: ConsultaComponent, title: 'Consultas' },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Página não encontrada!',
  },
];
