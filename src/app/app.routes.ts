import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'tasks/new',
        component: TaskFormComponent
    },
    {
        path: 'tasks/edit/:id',
        component: TaskFormComponent
    }
];
