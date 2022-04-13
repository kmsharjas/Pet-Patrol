import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLogin = true;
  loginForm: FormGroup;
  RegisterForm: FormGroup;
  message?: string;
  error?: string;
  error2?: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private rout: Router
  ) {
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

  regOTP() {
    this.message = undefined;

    this.error2 = undefined;
    const data = this.RegisterForm.value;
    // var id = this.RegisterForm.value.id;
    console.log(data);

    let jsn = {
      first_name: data.firstName,
      last_name: data.lastName,
      mobile: data.number,
      email: data.email,
    };
    console.log(jsn);
    this.userService.regOtp(jsn).subscribe((res) => {
      console.log(res);
      if (res === 'already registered number') {
        this.error2 = 'already registered number';
        // this.error2 = 'This mobile number is already in use.';
      }
    });
  }

  async register() {
    this.message = undefined;
    const { number, OTP } = this.RegisterForm.value;
    console.log(number, OTP);

    const data = this.RegisterForm.value;
    // var id = this.RegisterForm.value.id;
    console.log(data);

    let jsn = {
      first_name: data.firstName,
      last_name: data.lastName,
      mobile: data.number,
      email: data.email,
      otp: data.OTP,
    };
    try {
      this.message = await this.userService.register(jsn);
      if (this.message === 'otp is verified') this.rout.navigate(['/account']);
      // if (this.message === 'otp is verified') this.close.emit();
    } catch (error) {
      console.log(error);
      this.message = error.error.message;
    }
  }
}
