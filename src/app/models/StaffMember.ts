export interface StaffMember {
  fullName: string;
  hoursThisWeek: number;
  staffType: string;
  gender: string;
  shiftDays: string[];
  shiftHours: string;
  hireDate: string | Date | number;
  notes: string[];
  unit: string;
  phone: string;
  away: boolean;
  employmentType: string;
}
