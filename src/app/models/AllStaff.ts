import {EmploymentType} from './EmploymentType';
import {StaffType} from './StaffType';
import {ShiftDaysTypeRelation} from './ShiftDaysTypeRelation';
import {Gender} from './Gender';
import {Unit} from './Unit';

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
  unitsString: string;
  notes: string;
  rating?: number;
  birthDate: string | Date | number;
  ssn: string;
  location: Unit[];
}

