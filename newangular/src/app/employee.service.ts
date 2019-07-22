import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IEmployee } from './employee-details/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public _url : string="./assets/data/employees.json";
 
 constructor(private http:HttpClient) {}

 getEmployees():Observable<IEmployee[]> {
  return this.http.get<IEmployee[]>(this._url)

  // return [
  //   {id:"1",name:"prasad",age:"29"},
  //   {id:"2",name:"emp2",age:"20"},
  //   {id:"3",name:"emp3",age:"35"},
  // ]
}
errorHandler(){

}

}
