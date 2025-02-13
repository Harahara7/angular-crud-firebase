import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeId: string = '';
  employee$!: Observable<Employee | undefined>;
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      this.employee$ = this.employeeService.getEmployee(this.employeeId);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value)
        .then(() => {
          alert('Funcionário adicionado com sucesso!');
          this.router.navigate(['/']);
        })
        .catch(err => {
          alert('Erro ao adicionar funcionário: ' + err);
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
