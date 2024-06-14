import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
      });
  }

  onAddressAdded() {
    console.log('Address added');
  }

  onAddressRemoved(index: number) {
    console.log(`Address at index ${index} removed`);
  }

  onFormSubmitted(formValue: any) {
    console.log('Form submitted', formValue);
  }
}