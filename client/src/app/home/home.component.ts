import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;

  indexRes: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/product/limit/3').subscribe(data => {
      this.products = data;
    });
    this.http.get('http://localhost:8000/api/index').subscribe(res => {
      this.indexRes = res;
    });
  }

}
