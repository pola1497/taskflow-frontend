import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}
  
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  
  createTask(payload: TaskPayload): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, payload);
  }

  updateTask(id: number, payload: TaskPayload): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, payload);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}