import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for directives like *ngFor
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

// Navega para a página de adicionar novo funcionário
  addEmployee() {
    this.router.navigate(['/add']);
  }

// Navega para a página de editar funcionário
  editEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }

// Navega para a página de detalhe
  viewEmployee(id: string) {
    this.router.navigate(['/detail', id]);
  }

// Remove um funcionário
  deleteEmployee(id: string) {
    if (confirm('Tem certeza que deseja deletar este funcionário?')) {
      this.employeeService.deleteEmployee(id)
        .then(() => alert('Funcionário deletado com sucesso!'))
        .catch(err => alert('Erro ao deletar: ' + err));
    }
  }
}
