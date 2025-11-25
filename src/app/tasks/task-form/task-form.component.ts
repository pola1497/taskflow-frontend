import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService, TaskPayload } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  isEditMode = false;
  taskId?: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.taskId = Number(idParam);
      console.log('Edition mode form', this.taskId);
      this.tasksService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
          });
        },
        error: (error) => {
          console.error('Error fetching task:', error);
        }
      });
    } else {
      this.isEditMode = false;
      this.taskId = null;
      console.log('Creation mode form');
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      console.log('Not valid form');
      return;
    }

    const formValue = this.taskForm.value;

    const payload: TaskPayload = {
      title: formValue.title,
      description: formValue.description || undefined,
      status: formValue.status,
      priority: formValue.priority,
      dueDate: formValue.dueDate
        ? new Date(formValue.dueDate).toISOString()
        : undefined,
    };

    if (this.isEditMode && this.taskId !== null) {
      this.tasksService.updateTask(Number(this.taskId), payload).subscribe({
        next: (updatedTask) => {
          console.log('Task updated successfully:', updatedTask);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      this.tasksService.createTask(payload).subscribe({
        next: (createdTask) => {
          console.log('Task created successfully:', createdTask);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }
}

