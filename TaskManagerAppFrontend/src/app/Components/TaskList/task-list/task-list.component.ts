import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/Task.model';
import { TasksService } from '../../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  
  tasks: Task[] = [
    
  ];

  constructor(
    private taskservice: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.taskservice.getTasks()
   .subscribe({
    next: (tasks) => {
      this.tasks = tasks;
    },
    error: (response) => {
      console.log(response);
    }
   });
  }

  deleteTask(id: number) {
    this.taskservice.deleteTasks(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['TaskList']);
      }
    });
  }

  editTask(task: Task) {
    this.taskservice.changeTask(task);
    this.router.navigate(['/edit', task.id]); // Navigate to the edit route
  }

}
