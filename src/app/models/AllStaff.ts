import {EmploymentType} from './EmploymentType';
import {StaffType} from './StaffType';
import {ShiftDaysTypeRelation} from './ShiftDaysTypeRelation';
import {Gender} from './Gender';

export class AllStaff {
  id: number;
  firstName: string;
  lastName: string;
  employmentType: EmploymentType;
  gender: Gender;
  email: string;
  phone: string;
  hireDate: string | Date | number;
  staffType: StaffType;
  shiftDays: ShiftDaysTypeRelation[];
  shiftDaysString: string;
  notes: string;
}

