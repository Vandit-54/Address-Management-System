import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { filter } from 'rxjs';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {



  @Input() users!: any[];
  @Output() addressAdded = new EventEmitter<void>();
  @Output() addressRemoved = new EventEmitter<number>();
  @Output() formSubmitted = new EventEmitter<any>();  



  columnDefs = [
    { headerName: 'Full Name', field: 'userFields.fullName', flex: 1, filter: true },
    { headerName: 'User Name', field: 'userFields.userName', flex: 1, filter: true },
    { headerName: 'Email', field: 'userFields.email', flex: 1, filter: true },
    { headerName: 'Phone Number', field: 'userFields.phoneNumber', flex: 1, filter: true },
    { 
      headerName: 'Street', 
      valueGetter: (params: { data: { addressFields: { street: any; }[]; }; }) => params.data.addressFields[0]?.street, 
      flex: 1 , filter: true
    },
    { 
      headerName: 'City', 
      valueGetter: (params: { data: { addressFields: { city: any; }[]; }; }) => params.data.addressFields[0]?.city, 
      flex: 1 , filter: true
    },
    { 
      headerName: 'State', 
      valueGetter: (params: { data: { addressFields: { state: any; }[]; }; }) => params.data.addressFields[0]?.state, 
      flex: 1 , filter: true
    },
    { 
      headerName: 'Zip Code', 
      valueGetter: (params: { data: { addressFields: { zipCode: any; }[]; }; }) => params.data.addressFields[0]?.zipCode, 
      flex: 1 , filter: true
    }
  ];

  rowData!: any[];

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      userFields: this.fb.group({
        fullName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
      }),
      addressFields: this.fb.array([
        this.createAddressGroup()
      ])
    });
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  get addressFields(): FormArray {
    return this.form.get('addressFields') as FormArray;
  }

  addAddress(): void {
    this.addressFields.push(this.createAddressGroup());
    this.addressAdded.emit();
  }

  removeAddress(index: number): void {
    this.addressFields.removeAt(index);
    this.addressRemoved.emit(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
      this.form.reset();
    }
  }

}
