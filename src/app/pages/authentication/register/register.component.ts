import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  /*constructor(private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }*/
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

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire({
          title: 'Added!',
          text: 'User registered ',
          icon: 'success'
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire({
          title: 'error!',
          text: 'there is an error with register ',
          icon: 'error'
        });
      }
    });
  }
  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  /*
  onSubmit(): void {
    const { username, email, password } = this.form;
    
    // Add user registration data to the FormData
    const userFormData = new FormData();
    userFormData.append('username', username);
    userFormData.append('email', email);
    userFormData.append('password', password);
    
    // Add image file to the FormData
    userFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    
    this.authService.register(userFormData).subscribe({
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
  }*/
}
