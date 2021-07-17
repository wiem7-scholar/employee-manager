import {Component, OnInit} from '@angular/core';
import { Employee } from './employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[];//tsconfig.json on compilerconfig
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(){
    this.getEmployees();



  }

  public getEmployees(): void{

    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees =response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
  (response:Employee) => {
    console.log(response);
    this.getEmployees();
    addForm.reset();
  },
  (error :HttpErrorResponse) => {
         alert(error.message);
        addForm.reset();
       }
     );
   }


  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error :HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void) => {
        console.log(response);
        this.getEmployees();

      },
      (error :HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }



  public onOpenModal(employee: Employee, mode: string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';//we changed the default type which is submit to button
    button.style.display='none';//we don't show this button
    button.setAttribute('data-toggle','modal');//we added an attribute and set it to modal
    if (mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if (mode==='edit') {
      // @ts-ignore
      this.editEmployee= employee;
      button.setAttribute('data-target', '#editEmployeeModal');


    }

    if (mode==='delete') {
      this.deleteEmployee = employee;

      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
    }

}

