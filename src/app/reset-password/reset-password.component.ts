import { Component, OnInit } from '@angular/core';
import { ResetpasswordService } from '../_services/resetpassword.service';
import { ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private token: string;
  resetPasswordForm: FormGroup;

  constructor(private resetPasswordService: ResetpasswordService,private route: ActivatedRoute,private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });  
  
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]] // You can adjust the validation rules
    });
  }

    

  onSubmit() {
   let  passwordControl:string = this.resetPasswordForm.get('password')?.value;
    console.log(passwordControl);
  
    const requestBody = {
      password: passwordControl
    };
  
    this.resetPasswordService.resetPassword(this.token, passwordControl).subscribe(
      response => {
        console.log('Password reset successfully');
      },
      error => {
        console.error('Error resetting password', error);
      }
    );
  }
  
  }

