import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService, TaskPayload } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['']
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      console.log('Not valid form');
      return;
    }

    const payload = this.taskForm.value;
    this.tasksService.createTask(payload).subscribe({
      next: (taskCreated) => {
        console.log('Task created successfully:', taskCreated);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }
}

