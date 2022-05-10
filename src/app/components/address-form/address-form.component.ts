import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  @Input() values = null;
  @Input() showSubmit = true;

  @Output() submit = new EventEmitter();

  coutries$ = this.addressService.coutries$;
  states$ = this.addressService.states$;
  addressType$ = this.addressService.addressType$;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.addressForm = this.fb.group({
      mobile: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      flat_no: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      add_type: ['', Validators.required],
      isDefault: [false],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // console.log(this.values);
    if (this.values) this.addressForm.patchValue(this.values);
  }

  onsubmit() {
    if (this.addressForm.valid) return this.submit.emit(this.addressForm.value);
    else return alert('Please fill all the fields');
  }
}
