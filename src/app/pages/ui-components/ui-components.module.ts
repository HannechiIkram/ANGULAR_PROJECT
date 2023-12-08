import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailBlocComponent } from 'src/app/detail-bloc/detail-bloc.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ParentComponent } from './parent/parent.component';
import { FactureComponent } from './facture/facture.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { ExportPdfReservationComponent } from './export-pdf-reservation/export-pdf-reservation.component';
import { DetailFactureComponent } from './detail-facture/detail-facture.component';
import { AdduniversiteComponent } from './universite/adduniversite/adduniversite.component';
import { DetailuniversiteComponent } from './universite/detailuniversite/detailuniversite.component';
import { ShowuniversiteComponent } from './universite/showuniversite/showuniversite.component';
import { UpdateuniversiteComponent } from './universite/updateuniversite/updateuniversite.component';
import { ShowEtudiantComponent } from './show-etudiant/show-etudiant.component';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { ShowChambreComponent } from './show-chambre/show-chambre.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
    DetailBlocComponent,
    AddReservationComponent,
    ReservationComponent,
    ParentComponent,
    AddFactureComponent ,
    FactureComponent,
    ExportPdfReservationComponent,
    DetailFactureComponent ,
    AdduniversiteComponent,
    DetailuniversiteComponent,
    ShowuniversiteComponent,
    UpdateuniversiteComponent,
    ShowEtudiantComponent,
    UpdateEtudiantComponent,
    AddEtudiantComponent,
    ShowChambreComponent  
  ],
})
export class UicomponentsModule {}
