import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employeeId: string = '';
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Cria o formulário
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    // Obtém o ID do funcionário através da rota
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      // Carrega os dados do funcionário e preenche o formulário
      this.employeeService.getEmployee(this.employeeId).subscribe(employee => {
        if (employee) {
          this.employeeForm.patchValue(employee);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      // Atualiza o funcionário no Firebase
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
        .then(() => this.router.navigate(['/']))
        .catch(err => console.error('Erro ao atualizar funcionário:', err));
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
