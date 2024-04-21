import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeModel } from '../../../../models/employees/employee.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'description',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnInit {
  @Input() employee?: EmployeeModel;
  public employeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
  ) {

  }

  public updateEmployee(): void {
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
      {
        next: (response: boolean) => {
          alert('Employee updated');
          if (response) {
            window.location.reload();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      }
    );
  }


  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      id: new FormControl<string>(this.employee?.id ?? ''),
      birthdayDate: new FormControl<Date>(this.employee?.birthdayDate ?? new Date()),
      email: new FormControl<string>(this.employee?.email ?? ''),
      hireDate: new FormControl<Date>(this.employee?.birthdayDate ?? new Date()),
      lastName: new FormControl<string>(this.employee?.lastName ?? ''),
      name: new FormControl<string>(this.employee?.name ?? ''),
      phoneNumber: new FormControl<string>(this.employee?.phoneNumber ?? ''),
      roleId: new FormControl<string>(this.employee?.roleId ?? ''),
      image: new FormControl<string>(this.employee?.image ?? ''),
    });
  }

}