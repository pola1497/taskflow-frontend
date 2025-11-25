import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskEditButtonComponent } from '../task-edit-button/task-edit-button.component';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskEditButtonComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent {

  @Input() tasks: any[] = [];

  @Output() deleteTask = new EventEmitter<number>();

  onDelete(taskId: number){
    this.deleteTask.emit(taskId);
  }

}
