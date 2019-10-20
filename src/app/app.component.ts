import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intelycare';

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  sdfsdfsdf($event){
    // const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    console.log(event);
    console.log('asd');
  }
}
