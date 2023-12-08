import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';
import { UpdatefoyerComponent } from './updatefoyer/updatefoyer.component';
import { ShowFoyerComponent } from './show-foyer/show-foyer.component';
import { DetailFoyerComponent } from './detail-foyer/detail-foyer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignationBlocsComponent } from './assignation-blocs/assignation-blocs.component';



const routes: Routes = [
  {
    path: '',
    children: [
     
      { path: '', component: ShowFoyerComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add', component: AddFoyerComponent },
      { path: 'update/:id', component: UpdatefoyerComponent },
      { path: 'detail/:id', component: DetailFoyerComponent },
      { path: 'AssignerBlocs/:idFoyer/:capaciteFoyer/:blocsDispo', component: AssignationBlocsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
