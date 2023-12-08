import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatefoyerComponent } from './updatefoyer/updatefoyer.component';
import { DetailFoyerComponent } from './detail-foyer/detail-foyer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignationBlocsComponent } from './assignation-blocs/assignation-blocs.component';


import { RouterModule } from '@angular/router';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateFoyerInputComponent } from './update-foyer-input/update-foyer-input.component';
import { InvalidFormDirective } from './directive/invalid-form.directive';
import { ErrorMessageDirective } from './directive/error-message.directive';
import { InputBackgroundDirective } from './directive/input-background.directive';
import { InvalidNameDirective } from './directive/invalid-name.directive';
import { InvalidFormButtonColorDirective } from './directive/invalid-form-button-color.directive';
import { FoyerService } from 'src/app/service/foyer.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ShowFoyerComponent } from './show-foyer/show-foyer.component';





@NgModule({

  providers: [FoyerService],
  declarations: [
    AddFoyerComponent,
    UpdatefoyerComponent,
    DetailFoyerComponent,
    DashboardComponent,
    AssignationBlocsComponent,
    InvalidFormDirective,
    ErrorMessageDirective,
    InputBackgroundDirective,
    InvalidNameDirective,
    InvalidFormButtonColorDirective,
    UpdateFoyerInputComponent,
    ShowFoyerComponent,
    
   
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule, 
    NgxPaginationModule,
    AngularMultiSelectModule,
    MultiSelectModule,
    SelectDropDownModule,
    
  ]
})
export class FoyerModule { }
