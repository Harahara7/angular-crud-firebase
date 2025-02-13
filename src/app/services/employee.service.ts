import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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

  constructor(private firestore: Firestore) { }

  // CREATE: Adiciona um novo funcionário
  addEmployee(employee: Employee): Promise<any> {
    return addDoc(collection(this.firestore, this.collectionName), employee);
  }

  // READ: Retorna a lista de funcionários
  getEmployees(): Observable<Employee[]> {
    const employeesRef = collection(this.firestore, this.collectionName);
    // Retorna dados em tempo real
    return collectionData(employeesRef, { idField: 'id' }) as Observable<Employee[]>;
  }

  // READ: Retorna os dados de um funcionário específico
  getEmployee(id: string): Observable<Employee | undefined> {
    const employeeDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(employeeDocRef) as Observable<Employee | undefined>;
  }

  // UPDATE: Atualiza os dados de um funcionário
  updateEmployee(id: string, employee: Employee): Promise<void> {
    const employeeDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(employeeDocRef, { ...employee });
  }

  // DELETE: Remove um funcionário
  deleteEmployee(id: string): Promise<void> {
    const employeeDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(employeeDocRef);
  }
}
