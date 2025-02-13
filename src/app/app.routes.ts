import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
// Importe também outros componentes, se necessário

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: '**', redirectTo: '' }
];
