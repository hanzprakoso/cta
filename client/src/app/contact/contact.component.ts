import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: any;
  messageForm: FormGroup;
  name: string;
  email: string;
  message: string;

  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/contact').subscribe(res => {
      this.contact = res;
    });
    this.messageForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'message' : [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.api.sendMessage(form)
      .subscribe(res => {
          console.log(form);
          this.router.navigate(['/contact']);
        }, (err) => {
          console.log(form);
          console.log(err);
        });
  }
}
