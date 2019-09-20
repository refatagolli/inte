import {Days} from './Days';
import {ShiftType} from './ShiftType';

export interface ShiftDaysTypeRelation {
  id: number;
  day: Days;
  shiftType: ShiftType;
}
