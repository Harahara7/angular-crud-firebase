import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee$!: Observable<Employee | undefined>;
  employeeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employee$ = this.employeeService.getEmployee(this.employeeId);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
