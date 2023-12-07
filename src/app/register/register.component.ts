import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  uploadedImage: File;
  postResponse: any;
  successResponse: string;


  

  constructor(private authService: AuthService) { }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

 /* onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }*/

  onSubmit(): void {
    const { username, email, password } = this.form;
    
    // Add user registration data to the FormData
    const userFormData = new FormData();
    userFormData.append('username', username);
    userFormData.append('email', email);
    userFormData.append('password', password);
    
    // Add image file to the FormData
    userFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    console.log(this.uploadedImage)
    
    this.authService.register(username,email,password).subscribe({
      next: data => {
        console.log(data);
        this.postResponse = data;
        this.successResponse = this.postResponse.message;
        // Handle success as needed
      },
      error: err => {
        console.error(err);
        // Handle error as needed
      }
    });
  }
}
