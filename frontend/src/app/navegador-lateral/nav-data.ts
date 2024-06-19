import { TNavbarData } from './helper';

export const navbarData: TNavbarData[] = [
  {
    routeLink: 'solicitacoes',
    icon: 'fal fa-tasks',
    label: 'Solicitações',
    items: [],
  },
  {
    routeLink: 'teste1',
    icon: 'fal fa-eye',
    label: 'Abaixo exemplos de telas com sub-menus',
    items: [],
  },
  {
    routeLink: 'users',
    icon: 'fal fa-user',
    label: 'Usuários',
    items: [
      {
        routeLink: 'users/list',
        icon: '',
        label: 'Listar',
        items: [],
      },
    ],
  },
  {
    routeLink: 'finances',
    icon: 'fal fa-money-bill',
    label: 'Finanças',
    items: [
      {
        routeLink: 'finances/list',
        icon: '',
        label: 'Listar',
        items: [],
      },
      {
        routeLink: 'finances/create',
        icon: '',
        label: 'Criar',
        items: [],
      },
    ],
  },
  {
    routeLink: 'cars',
    icon: 'fal fa-cars',
    label: 'Carros',
    items: [
      {
        routeLink: 'cars/list',
        icon: '',
        label: 'Listar',
        items: [],
      },
      {
        routeLink: 'cars/create',
        icon: '',
        label: 'Criar',
        items: [],
      },
      {
        routeLink: 'cars/config',
        icon: '',
        label: 'Configurações',
        items: [],
      },
    ],
  },
];
