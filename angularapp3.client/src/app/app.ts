import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, TodoItem } from './todo.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ViewChild, ElementRef } from '@angular/core';

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [
    trigger('todoAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px) scale(0.98)' }),
        animate(
          '220ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ]),
      transition(':leave', [
        animate(
          '180ms ease-in',
          style({ opacity: 0, transform: 'translateY(-6px)' })
        )
      ]),
    ]),
    trigger('filterAnim', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = '';
  todos: TodoItem[] = [];
  filter: Filter = 'all';

  @ViewChild('taskInput', { static: false }) taskInput!: ElementRef<HTMLInputElement>;
  
  constructor(private todoService: TodoService) {
    this.load();
  }

  // 🔥 Главное исправление — обновляем массив без пересоздания
  load() {
    this.todoService.getTodos().subscribe(t => {
      this.todos.length = 0;
      this.todos.push(...t);
    });
  }

  add() {
    if (!this.title.trim()) return;

    this.todoService.addTodo(this.title).subscribe(() => {
      this.title = '';
      this.load();

      setTimeout(() => {
        if (this.taskInput) {
          this.taskInput.nativeElement.focus();
        }
      });
    });
  }

  toggle(todo: TodoItem) {
    this.todoService.updateTodo(todo).subscribe(() => this.load());
  }

  remove(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.load());
  }

  setFilter(f: Filter) {
    this.filter = f;
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.isDone);
      case 'done':
        return this.todos.filter(t => t.isDone);
      default:
        return this.todos;
    }
  }

  // ✔ trackBy — чтобы Angular не пересоздавал DOM
  trackById(index: number, item: TodoItem) {
    return item.id;
  }

  get totalCount() {
    return this.todos.length;
  }

  get activeCount() {
    return this.todos.filter(t => !t.isDone).length;
  }

  get doneCount() {
    return this.todos.filter(t => t.isDone).length;
  }
}
