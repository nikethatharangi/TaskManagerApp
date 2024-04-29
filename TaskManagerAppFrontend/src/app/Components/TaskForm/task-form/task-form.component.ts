import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})

export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isUpdateMode: boolean = false;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}), 
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      dueDate: new FormControl('')
    });
  }

  ngOnInit() {
    this.taskService.currentTask.subscribe(task => {
      if (task) {
        this.isUpdateMode = true;
        this.taskForm.patchValue(task);
      }
    });
  
    const taskId = this.route.snapshot.paramMap.get('id')?.toString();
    console.log('Task ID:', taskId); 
    if (taskId) {
      const taskIdNumber = parseInt(taskId, 10);
      console.log('Task ID Number:', taskIdNumber); 
      this.isUpdateMode = true;
      this.taskService.getTaskById(taskIdNumber).subscribe((task) => {
        console.log('Retrieved Task:', task);
        this.taskForm.patchValue(task);
      });
    }
  }
  
  

  onSubmit() {
    if (this.isUpdateMode) {
      // Update task
      this.taskService.updateTask(this.taskForm.value).subscribe({
        next: (response) => {
          alert('Task updated successfully!');
          this.router.navigate(['/tasks']);
          location.reload();
        },
        error: (err) => {
          const errorMessage = err && err.message ? err.message : 'An error occurred while updating the task.';
          console.error(errorMessage);
          alert(errorMessage);
          location.reload();
        }
      });
    } else {
      // Add task
      this.taskService.addTask(this.taskForm.value).subscribe({
        next: (response) => {
          alert('Task added successfully!');
          this.router.navigate(['/tasks']);
          location.reload();
        },
        error: (err) => {
          const errorMessage = err && err.message ? err.message : 'An error occurred while adding the task.';
          console.error(errorMessage);
          alert(errorMessage);
        }
      });
    }
  }
  
}
