import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;

  productRes: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/product').subscribe(data => {
      this.products = data;
    });
    this.http.get('http://localhost:8000/api/product_page').subscribe(res => {
      this.productRes = res;
    });
  }

}
