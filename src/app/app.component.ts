import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userFields: this.fb.group({
        userId: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  get addressFields(): FormArray {
    return this.form.get('addressFields') as FormArray;
  }

  addAddress(): void {
    this.addressFields.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    this.addressFields.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
