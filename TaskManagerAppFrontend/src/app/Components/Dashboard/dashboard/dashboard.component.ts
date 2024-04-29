import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalTasks: number = 0;
  dueTodayTasks: number = 0;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      // Calculate total tasks
      this.totalTasks = tasks.length;
  
      // Debugging: Log tasks and today's date
      console.log("Tasks:", tasks);
      const today = new Date();
      console.log("Today's date:", today);
  
      // Filter tasks due today
      const dueTodayTasksArray = tasks.filter(task => this.isDueToday(task.dueDate, today));
      console.log("Tasks due today (array):", dueTodayTasksArray);
  
      // Count tasks due today
      this.dueTodayTasks = dueTodayTasksArray.length;
      console.log("Tasks due today:", this.dueTodayTasks);
    });
  }

  isDueToday(dueDate: any, today: Date): boolean {
    const taskDueDate = new Date(dueDate);
    return taskDueDate.getFullYear() === today.getFullYear() &&
           taskDueDate.getMonth() === today.getMonth() &&
           taskDueDate.getDate() === today.getDate();
  }
}
