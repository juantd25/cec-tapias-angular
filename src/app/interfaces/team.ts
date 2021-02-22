import { Employee } from './employee';

export interface Team {
  $key?: string;
  name: string;
  employees: Employee[];
}
