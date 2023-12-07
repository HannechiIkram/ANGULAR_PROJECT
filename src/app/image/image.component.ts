import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  //private userId = sessionStorage.getItem('id'); 
  private selectedFile: File | null = null;


  constructor(private userService: UserService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  uploadImage(): void {
    if (this.selectedFile) {
      const authUserString = sessionStorage.getItem('auth-user');
if (authUserString) {
  const authUser = JSON.parse(authUserString);
  const userId = authUser.id;
  console.log(userId  )

      this.userService.uploadImageToUser(userId, this.selectedFile)
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully', response);
          },
          (error) => {
            console.error('Error uploading image', error);
          }
        );
}
    } else {
      console.error('No file selected');
    }
}


}