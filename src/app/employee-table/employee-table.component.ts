import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';
import { EmployeeService } from '../services/employee.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  public employees$: Observable<Employee[]>;
  public selectedEmployee: Employee;
  public showModal = false;

  constructor(
    private employeeService: EmployeeService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
  }

  newEmployee() {
    this.showModal = true;
    this.selectedEmployee = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  deleteEmployee(employee: Employee) {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        console.log(teams);
        const moddifiedEmployees = teams[0].employees
          ? teams[0].employees.filter((p: any) => p.key !== employee.$key)
          : teams[0].employees;
        const formattedTeam = {
          ...teams[0],
          employees: [...moddifiedEmployees],
        };
        this.employeeService.deleteEmployee(employee.$key);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog() {
    this.showModal = false;
  }
}
