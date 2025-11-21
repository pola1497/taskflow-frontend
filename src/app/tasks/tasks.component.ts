import { Component, OnInit } from '@angular/core';
import { TasksService, Task } from './tasks.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tasks added', this.tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
}
  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        console.log(`Task deleted successfully.`);
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
