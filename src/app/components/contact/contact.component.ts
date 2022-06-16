import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  envApiRoot = environment.apiBaseUrl;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      number: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    let data = this.contactForm.value;
    console.log(data);
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      let data = this.contactForm.value;
      console.log(data);
      let body = {
        name: data.name,
        email: data.email,
        mobile: data.number,
        msg: data.message,
        subject: '',
      };

      this.http.post(this.envApiRoot + '/contactus', body).subscribe((res) => {
        console.log(res);
        alert('Thank you for contacting us');
        this.contactForm.reset();
      });
    } else alert('Please fill all the fields');
  }
}
