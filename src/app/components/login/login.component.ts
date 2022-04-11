import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  loginForm: FormGroup;
  RegisterForm: FormGroup;
  message?: string;
  error?: string;
  error2?: string;
  constructor(private fb: FormBuilder, private userService: UserService) {
    //login form
    this.loginForm = this.fb.group({
      mobile: [null, Validators.required],
      otp: [null, Validators.required],
    });
    //register form
    this.RegisterForm = this.fb.group({
      id: [null],
      firstName: [null, Validators.required],
      lastName: ['', Validators.required],
      number: [
        null,
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      email: [null, Validators.required],
      OTP: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  getOTP() {
    this.error = undefined;
    this.message = undefined;

    const { mobile } = this.loginForm.value;
    // console.log(mobile);

    this.userService.getOtp(mobile).subscribe(
      (res) => {
        // console.log(res);
        if (res === 'no such user') {
          this.error = 'We cannot find an account with this mobile number.';
        }
      },
      (err) => {
        // console.log(err);
        this.error = 'We cannot find an account with this mobile number';
      }
    );
  }

  async login() {
    this.message = undefined;

    const { mobile, otp } = this.loginForm.value;
    // console.log(mobile, otp);

    try {
      this.message = await this.userService.login(mobile, otp);
      // if (this.message === 'otp is verified') this.close.emit();
    } catch (error) {
      console.log(error);
      this.message = error.error.message;
    }
  }
}
