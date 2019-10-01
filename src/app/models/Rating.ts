import {EmploymentType} from './EmploymentType';
import {StaffType} from './StaffType';
import {ShiftDaysTypeRelation} from './ShiftDaysTypeRelation';
import {Gender} from './Gender';
import {Unit} from './Unit';
import {AllStaff} from './AllStaff';

export class Rating {
  id: number;
  comment: string;
  rater: AllStaff;
  ratingDate: string | Date | number;
  rate: number;
}

