import { createAction, props } from '@ngrx/store';
import { CreateTodo, Todo, UpdateTodo } from '../../interfaces/todo.interface';
import { Product } from '../../interfaces/clients';

export const createTodoRequest = createAction(
  '[Todo] Create Todo Request',
  props<{ todo: Product }>()
);

export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{ todo: Product }>()
);

//Se llama al iniciar la app
export const getTodosRequest = createAction(
  '[Todo] Get Todos Request' // Nombre genérico de la acción
);

// Esta acción será llamada cuando la API nos responda
export const getTodosSuccess = createAction(
  '[Todo] Get Todos Success', // Nombre genérico de la acción
  props<{ todos: Product[] }>() // Se recibe como props un arreglo de TODOS
);

export const todosError = createAction(
  '[Todo] Get Todos Error',
  props<{ error: string }>()
);

export const updateProductRequest = createAction(
  '[Todo] Update Todo Request',
  props<{ code: string; todo: Product }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: any }>()
);

export const deleteTodoRequest = createAction(
  '[Todo] Delete Todo Request',
  props<{ code: string }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ code: string }>()
);
