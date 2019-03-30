import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  servicePage: any;
  service: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/service_page').subscribe(data => {
      this.servicePage = data;
    });
    this.http.get('http://localhost:8000/api/service').subscribe(data => {
      this.service = data;
    });
  }

}
