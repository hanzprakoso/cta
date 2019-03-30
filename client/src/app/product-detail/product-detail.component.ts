import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  detail: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getProductDetail(this.route.snapshot.params['id']);
  }
  getProductDetail(id) {
    this.http.get('http://localhost:8000/api/product/' + id).subscribe(data => {
      this.detail = data;
    });
  }
}
