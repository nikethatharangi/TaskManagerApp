import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Components/TaskList/task-list/task-list.component';
import { TaskFormComponent } from './Components/TaskForm/task-form/task-form.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'TaskList',
    component: TaskListComponent,
  },
  { 
    path: 'TaskForm', 
    component: TaskFormComponent 
  },
  { 
    path: 'edit/:id', 
    component: TaskFormComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
