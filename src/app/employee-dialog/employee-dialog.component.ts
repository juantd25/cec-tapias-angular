import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Areas, Employee, DocType } from '../interfaces/employee';
import { EmployeeService } from '../services/employee.service';
import { TeamService } from '../services/team.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
  @Input() employee: Employee;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team;

  public areas = Object.keys(Areas).map((key) => ({
    label: key,
    key: Areas[key],
  }));

  public doctype = Object.keys(DocType).map((key) => ({
    label: key,
    key: DocType[key],
  }));

  constructor(
    private EmployeeService: EmployeeService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newEmployee(employeeFormValue) {
    const key = this.EmployeeService.addEmployee(employeeFormValue).key;
    const employeeFormValueKey = {
      ...employeeFormValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      employees: [
        ...(this.team.employees ? this.team.employees : []),
        employeeFormValueKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }

  private editEmployee(employeeFormValue) {
    const employeeFormValueWithKey = {
      ...employeeFormValue,
      $key: this.employee.$key,
    };
    const employeeFormValueWithFormattedKey = {
      ...employeeFormValue,
      key: this.employee.$key,
    };
    delete employeeFormValueWithFormattedKey.$key;
    const moddifiedEmployees = this.team.employees
      ? this.team.employees.map((employee) => {
          return employee.key === this.employee.$key
            ? employeeFormValueWithFormattedKey
            : employee;
        })
      : this.team.employees;
    const formattedTeam = {
      ...this.team,
      employees: [
        ...(moddifiedEmployees
          ? moddifiedEmployees
          : [employeeFormValueWithFormattedKey]),
      ],
    };
    this.EmployeeService.editEmployee(employeeFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(employeeForm: NgForm) {
    const employeeFormValue = { ...employeeForm.value };
    if (this.employee) {
      this.editEmployee(employeeFormValue);
    } else {
      this.newEmployee(employeeFormValue);
    }

    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
