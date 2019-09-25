import {StaffMember} from './StaffMember';

export interface UserResponse extends StaffMember {
  response: 'accept' | 'pending' | 'reject';
}
