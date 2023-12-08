import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { ShowBlocComponent } from 'src/app/show-bloc/show-bloc.component';
import { AddBlocComponent } from 'src/app/add-bloc/add-bloc.component';
import { DetailBlocComponent } from 'src/app/detail-bloc/detail-bloc.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ExportPdfReservationComponent } from './export-pdf-reservation/export-pdf-reservation.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { FactureComponent } from './facture/facture.component';
import { DetailFactureComponent } from './detail-facture/detail-facture.component';
import { ShowuniversiteComponent } from './universite/showuniversite/showuniversite.component';
import { DetailuniversiteComponent } from './universite/detailuniversite/detailuniversite.component';
import { UpdateuniversiteComponent } from './universite/updateuniversite/updateuniversite.component';
import { AdduniversiteComponent } from './universite/adduniversite/adduniversite.component';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { ShowEtudiantComponent } from './show-etudiant/show-etudiant.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { ShowChambreComponent } from './show-chambre/show-chambre.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {

      
        path: 'universite',
        component: ShowuniversiteComponent,
      },
      { path: 'add',component: AdduniversiteComponent },

      { path: 'detail/:id', component: DetailuniversiteComponent },

      { path: 'update/:id', component: UpdateuniversiteComponent },
      { path: '', redirectTo: 'show', pathMatch: 'full' }, 
      {
        path: 'showBloc',
        component:ShowBlocComponent,
      },
      {
        path: 'addBloc',
        component: AddBlocComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'detailBloc/:id',
        component: DetailBlocComponent,
      },
      {
        path: 'reservation',
        component: ReservationComponent,
      },
      {
        path: 'add-reservation',
        component: AddReservationComponent,

      },


      {
        path: 'showChambre',
        component: ShowChambreComponent,

      },
      {
        path: 'exportPdf',
        component: ExportPdfReservationComponent,
      },
      {
        path: 'add-facture',
        component: AddFactureComponent,
      },
      {
        path: 'facture',
        component: FactureComponent,
      },
      {
        path: 'detailFacture/:id',
        component: DetailFactureComponent,
      },
      { path: 'updateEtudiant/:id', component: UpdateEtudiantComponent },
  {path: 'addEtudiant', component: AddEtudiantComponent},
  {path: 'ShowEtudiant', component: ShowEtudiantComponent},

  //{path: 'details/:id', component: DetailEtudiantComponent},



    ],
  },
];
