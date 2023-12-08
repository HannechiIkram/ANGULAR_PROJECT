import { Component, EventEmitter,Input,Output, SimpleChanges } from "@angular/core"
import { BlocService } from "../bloc.service"
import { Bloc } from "../models/bloc"
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-bloc',
  templateUrl: './update-bloc.component.html',
  styleUrls: ['./update-bloc.component.scss']
})
export class UpdateBlocComponent {
  @Input()bloc =new Bloc();
  @Output()notif=new EventEmitter();
  @Output()updateUser=new EventEmitter()
  errorData: any = {};

  constructor(private s:BlocService){
  
  }
  ngOnInit(){
  
  }
  showForm(){
    this.notif.emit('bonjour')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  
  update(updateBloc: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.s.updateBloc(updateBloc, this.bloc?.idBloc).subscribe(
          (res) => {
            this.updateUser.emit(updateBloc);
            Swal.fire({
              title: 'Update successful!',
              text: 'The details of the bloc have been updated successfully.',
              icon: 'success'
            });
          },
          (error) => {
            this.errorData = error;
            console.error('Error updating bloc:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while updating the bloc.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
}