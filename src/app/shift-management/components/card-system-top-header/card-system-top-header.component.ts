import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'card-system-top-header',
  templateUrl: './card-system-top-header.component.html',
  styleUrls: ['./card-system-top-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSystemTopHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() indicator: string;

  constructor() { }

  ngOnInit() {
  }

}
