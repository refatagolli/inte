import {EmploymentType} from './EmploymentType';
import {StaffType} from './StaffType';
import {ShiftDaysTypeRelation} from './ShiftDaysTypeRelation';

export interface AllStaff {
  firstName: string;
  lastName: string;
  employmentType: EmploymentType;
  gender: string;
  phone: string;
  hireDate: string | Date | number;
  staffType: StaffType;
  shiftDays: ShiftDaysTypeRelation[];
  notes: string;
}

