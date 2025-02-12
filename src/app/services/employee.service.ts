import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// Crie uma interface para o Employee para tipagem:
export interface Employee {
  id?: string;      // Será gerado automaticamente pelo Firestore
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private collectionName = 'employees'; // nome da coleção no Firestore

  constructor(private firestore: AngularFirestore) { }

  // CREATE: Adiciona um novo funcionário
  addEmployee(employee: Employee): Promise<any> {
    return this.firestore.collection(this.collectionName).add(employee);
  }

  // READ: Retorna a lista de funcionários
  getEmployees(): Observable<Employee[]> {
    return this.firestore.collection<Employee>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // READ: Retorna os dados de um funcionário específico
  getEmployee(id: string): Observable<Employee | undefined> {
    return this.firestore.doc<Employee>(`${this.collectionName}/${id}`).valueChanges();
  }

  // UPDATE: Atualiza os dados de um funcionário
  updateEmployee(id: string, employee: Employee): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).update(employee);
  }

  // DELETE: Remove um funcionário
  deleteEmployee(id: string): Promise<void> {
    return this.firestore.doc(`${this.collectionName}/${id}`).delete();
  }
}
