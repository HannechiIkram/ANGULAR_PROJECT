import { Component } from '@angular/core';
import { BlocService } from '../bloc.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Bloc } from '../models/bloc';
import {  MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this Bloc?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const blocData: Bloc = this.fg.value as unknown as Bloc;
  
        this.b.addBloc(blocData).subscribe(
          () => {
            Swal.fire({
              title: 'Added!',
              text: 'The Bloc has been added successfully.',
              icon: 'success'
            }).then(() => {
              this.dialogRef.close();
            });
          },
          (error) => {
            console.error('Error adding Bloc:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while adding the Bloc.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

    
    }
 


