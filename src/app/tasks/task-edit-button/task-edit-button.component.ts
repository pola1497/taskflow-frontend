import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './task-edit-button.component.html',
  styleUrl: './task-edit-button.component.scss'
})
export class TaskEditButtonComponent {

  @Input() taskId!: number;

  constructor(private router: Router) {}
  
  goToEdit() {
    this.router.navigate([`/tasks/edit/${this.taskId}`]);
  }

}
