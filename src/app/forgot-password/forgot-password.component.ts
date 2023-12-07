import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetpasswordService } from '../_services/resetpassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private resetPasswordService: ResetpasswordService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    let email= this.forgotPasswordForm.value.email;
   

    this.resetPasswordService.forgotpassword(email).subscribe(
      response => {
        // Handle success, e.g., show a success message
        console.log('Reset password email sent successfully');
      },
      error => {
        // Handle error, e.g., show an error message
        console.error('Error sending reset password email', error);
      }
    );
  }
}
