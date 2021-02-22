import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeDb: AngularFireList<Employee>;

  constructor(private db: AngularFireDatabase) {
    this.employeeDb = this.db.list('/employees', (ref) =>
      ref.orderByChild('name')
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeeDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  addEmployee(employee: Employee) {
    return this.employeeDb.push(employee);
  }

  deleteEmployee(id: string) {
    this.db.list('/employees').remove(id);
  }

  editEmployee(newEmployeeData) {
    const $key = newEmployeeData.$key;
    delete newEmployeeData.$key;
    this.db.list('/employees').update($key, newEmployeeData);
  }
}
