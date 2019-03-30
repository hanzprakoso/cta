import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/about').subscribe(res => {
      this.about = res;
    });
  }

}
