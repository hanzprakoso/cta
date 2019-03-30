import { Component } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {NgZone, Renderer, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  // animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CTA'
}
