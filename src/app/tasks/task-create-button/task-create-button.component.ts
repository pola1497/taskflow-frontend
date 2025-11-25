import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create-button',
  standalone: true,
  imports: [],
  templateUrl: './task-create-button.component.html',
  styleUrl: './task-create-button.component.scss'
})
export class TaskCreateButtonComponent {

  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['/tasks/new']);
  }

}
