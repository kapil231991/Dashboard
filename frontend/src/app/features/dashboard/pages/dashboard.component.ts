import { Component, effect } from '@angular/core';
import { TodoService } from '../../../shared/services/todo.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(public todoService: TodoService) {
    
    effect(() => {
      console.log(
        'DASHBOARD EFFECT → Open:',
        this.todoService.openTodos().length,
        'Done:',
        this.todoService.doneTodos().length
      );
    });
  }
}
