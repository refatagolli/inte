import {Component, Input, OnInit} from '@angular/core';
import {ShiftDeatils} from '../../../models/ShiftDeatils';

@Component({
  selector: 'app-fill-shift-component',
  templateUrl: './fill-shift-component.component.html',
  styleUrls: ['./fill-shift-component.component.scss']
})
export class FillShiftComponentComponent implements OnInit {

  @Input() shiftDetails: ShiftDeatils;

  constructor() {
  }

  ngOnInit() {
  }

}
