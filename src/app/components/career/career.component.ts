import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent implements OnInit {
  baseUrl = environment.apiBaseUrl;
  careerForm: FormGroup;
  fileInfo: string;
  file: any;
  envApiRoot: string;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.careerForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      mail: [null, Validators.required],
      phone: [null, Validators.required],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  //upload file
  uploadFile(event) {
    console.log(event.target.files[0]);
    console.log(this.careerForm.value);

    const file = event.target.files[0];
    console.log(file);
  }

  onFileSelect(input: HTMLInputElement): void {
    /**
     * Format the size to a human readable string
     *
     * @param bytes
     * @returns the formatted string e.g. `105 kB` or 25.6 MB
     */
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;

      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }

      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }

    this.file = input.files[0];
    console.log(this.file);

    this.fileInfo = `${this.file.name} (${formatBytes(this.file.size)})`;
    console.log(this.fileInfo);
  }

  Submit(val) {
    // alert(val.value);
    console.log(val.value);

    console.log(val);
    let data = val.value;
    let fileToUpload = <File>this.file;
    const formData = new FormData();
    formData.append('file', fileToUpload, this.file.name);
    formData.append('mail', data.mail);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', data.phone);
    console.log(formData);

    this.http.post(this.baseUrl + '/filesend', formData).subscribe((res) => {
      console.log(res);
      this.careerForm.reset();
    });
    console.log(val.value);

    let body = {
      first_name: data.first_name,
      last_name: data.last_name,
      mail: data.mail,
      phone: data.phone,
      file: data.file,
    };
    console.log(body);
  }
}
