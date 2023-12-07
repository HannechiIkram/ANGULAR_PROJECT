import { Component } from '@angular/core';
import { BlocService } from '../bloc.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Bloc } from '../models/bloc';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bloc',
  templateUrl: './add-bloc.component.html',
  styleUrls: ['./add-bloc.component.scss']
})
export class AddBlocComponent {
  vF:any;
  bloc:any 
  submitted = true; 
  constructor( public dialogRef: MatDialogRef<AddBlocComponent>,private b:BlocService,private Fb:FormBuilder){
  
  }
  fg=this.Fb.group({
    idBloc:[''],
    nomBloc:['',[Validators.required]],
    capaciteBloc:[''],
    foyer:[''],
   
  
  })
  submit() {
    
    const blocData: Bloc = this.fg.value as unknown as Bloc;
  
    this.b.addBloc(blocData).subscribe(
      () => {
        this.dialogRef.close();
      }
    );
    
  }
  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

    
    }
 


