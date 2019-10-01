import {Unit} from './Unit';
import {ShiftType} from './ShiftType';
import {AllStaff} from './AllStaff';

export interface StaffShifts {
  id: number;
  shiftDate: Date;
  shiftType: ShiftType;
  location: Unit;
  staffMember: AllStaff;
}
