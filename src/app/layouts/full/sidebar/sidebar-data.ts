import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/foyer/dashboard',
  },
  {
    displayName: 'Reservation',
    iconName: 'list',
    route: '/content/reservation',
  },
  {
    displayName: 'Facture',
    iconName: 'list',
    route: '/content/facture',
  },

  {
    displayName: 'Bloc',
    iconName: 'list',
    route: '/content/showBloc',
  },
  {
    displayName: 'Foyer',
    iconName: 'list',
    route: 'foyer',
  },
  {
    displayName: 'Universite',
    iconName: 'list',
    route: '/content/universite',
  },
  {
    displayName: 'Etudiant',
    iconName: 'list',
    route: '/content/ShowEtudiant',
  },
 
  
];
