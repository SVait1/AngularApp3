import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

interface CreateTodoDto {
  title: string;
  isDone: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiUrl = '/api/todo';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Ошибка загрузки задач', err);
        return throwError(() => err);
      })
    );
  }

  addTodo(title: string): Observable<TodoItem> {
    const body: CreateTodoDto = { title, isDone: false };
    return this.http.post<TodoItem>(this.apiUrl, body);
  }

  updateTodo(item: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
