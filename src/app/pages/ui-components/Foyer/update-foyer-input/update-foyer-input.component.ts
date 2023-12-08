import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/service/foyer.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-foyer-input',
  templateUrl: './update-foyer-input.component.html',
  styleUrls: ['./update-foyer-input.component.scss']
})
export class UpdateFoyerInputComponent {

  @Input()foyer =new Foyer();
  @Output()notif=new EventEmitter();
  @Output()updateUser=new EventEmitter()
  errorData: any = {};

  constructor(private s:FoyerService){
  
  }
  ngOnInit(){
  
  }
  showForm(){
    this.notif.emit('bonjour')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  
  update(updateFoyer: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change the status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.s.updateFoy(updateFoyer, this.foyer?.idFoyer).subscribe(
          (res) => {
            this.updateUser.emit(updateFoyer);
            Swal.fire({
              title: 'Update successful!',
              text: 'The details of the foyer have been updated successfully.',
              icon: 'success'
            });
          },
          (error) => {
            this.errorData = error;
            console.error('Error updating foyer:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while updating the foyer.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  

}
