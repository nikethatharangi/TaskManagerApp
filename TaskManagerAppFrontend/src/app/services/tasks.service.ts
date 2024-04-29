import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from '../models/Task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl:string = environment.baseApiUrl;

  
  private taskSource = new BehaviorSubject<Task | null>(null);
  currentTask = this.taskSource.asObservable();

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/api/Task');
  }

  deleteTasks(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(this.baseUrl + '/api/Task/' + id);
  }
  
  changeTask(task: Task | null) {
    this.taskSource.next(task);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/api/Task/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/api/Task/${task.id}`, task);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/api/Task`, task);
  }

  
  
}
