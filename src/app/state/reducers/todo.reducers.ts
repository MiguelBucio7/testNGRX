import { createReducer, on } from '@ngrx/store';
import {
  createTodoRequest,
  createTodoSuccess,
  deleteTodoRequest,
  deleteTodoSuccess,
  getTodosRequest,
  getTodosSuccess,
  updateProductRequest,
  updateTodoSuccess,
} from '../actions/todo.actions';
import { TodoState } from '../../interfaces/todo-state';

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};

export const _todoReducer = createReducer(
  initialState,
  on(createTodoRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...(state.todos || []), todo], // Se agrega el TODO creado al arreglo de TODOS
    loading: false,
  })),

  on(getTodosRequest, (state) => ({
    ...state, // Se regresa el mismo estado
    loading: true, // Se cambia el estado para indicar que se están cargando los TODOS desde la API
  })),

  on(getTodosSuccess, (state, { todos }) => ({
    ...state, // Se regresa el mismo estado
    todos, // Se actualiza el estado con los TODOS obtenidos
    loading: false, // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
  })),

  on(updateProductRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos?.map((t) => (t.code === todo.code ? todo : t)), // Se actualiza el TODO en el arreglo de TODOS
    loading: false,
  })),
  on(deleteTodoRequest, (state) => ({
    ...state,
    loading: true,
  })),

  on(deleteTodoSuccess, (state, { code }) => ({
    ...state,
    todos: state.todos?.filter((t) => t.code !== code), // Retornar todos los TODOS menos el que se eliminó
    loading: false,
  }))
);
