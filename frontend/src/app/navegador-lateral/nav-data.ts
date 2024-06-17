import { TNavbarData } from './helper';

export const navbarData: TNavbarData[] = [
  {
    routeLink: 'solicitacoes',
    icon: 'fal fa-tasks',
    label: 'Solicitações',
    items: [
      {
        routeLink: 'solicitacoes/create',
        label: 'Criar',
        items: [],
      },
      {
        routeLink: 'solicitacoes/list',
        label: 'Listar',
        items: [],
      },
    ],
    expanded: false,
  },
  {
    routeLink: 'aprovacoes',
    icon: 'fal fa-eye',
    label: 'Aprovações',
    items: [],
    expanded: false,
  },
];
