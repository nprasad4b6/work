 import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  template: `
  
  <h2>List of Employees serverd by another service</h2>
  <ol *ngFor="let employee of employees">
      <li>{{employee.id}}{{employee.name}}{{employee.age}}</li>
  </ol>
  
  `,
  styleUrls: []
})
export class EmployeeDetailsComponent implements OnInit {
 public employees = [];
  constructor(private _employeeDetails: EmployeeService) { }

  ngOnInit() {

    // this.employees = this._employeeDetails.getEmployees();q`
    this._employeeDetails.getEmployees()
            .subscribe(data=> this.employees = data);
  }     

}
