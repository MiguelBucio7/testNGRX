import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  createTodoRequest,
  createTodoSuccess,
  deleteTodoRequest,
  deleteTodoSuccess,
  getTodosRequest,
  getTodosSuccess,
  todosError,
  updateProductRequest,
  updateTodoSuccess,
} from '../actions/todo.actions';
import { TodoService } from '../../services/todosservice';

@Injectable()
export class TodosEffects {
  // Se inyectan las dependencias
  constructor(private actions$: Actions, private todoService: TodoService) {}
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodoRequest),
      exhaustMap((action) =>
        this.todoService.createTodo(action.todo).pipe(
          map((resp: any) => {
            console.log('reeessppp', resp);
            return createTodoSuccess({ todo: resp});
          }),
          catchError(() => {
            return [todosError({ error: 'Error al crear el TODO' })];
          })
        )
      )
    )
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodosRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
      exhaustMap(() =>
        //exhaustMap se usa para evitar que se hagan peticiones duplicadas
        this.todoService
          .getTodos() // Se llama al servicio
          .pipe(
            // se tratan los datos obtenidos
            map((resp) => {
              // Se retorna la acción getTodosSuccess con los TODOS obtenidos
              return getTodosSuccess({ todos: resp }); // La respuesta se la pasa por props a la acción
            }),
            catchError((err) => {
              console.log(err);
              // Se retorna la acción getTodosError con un error en caso de que la petición falle
              return [todosError({ error: 'Error al obtener los TODOS' })];
            })
          )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
      exhaustMap(
        (
          action //exhaustMap se usa para evitar que se hagan peticiones duplicadas
        ) =>
          this.todoService
            .updateTodo(action.todo) // Se llama al servicio
            .pipe(
              // se tratan los datos obtenidos
              map((resp: any) => {
                return updateTodoSuccess({ todo: resp });
              }),
              catchError(() => {
                // Se retorna la acción getTodosError con un error en caso de que la petición falle
                return [todosError({ error: 'Error al actualizar el TODO' })];
              })
            )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodoRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
      exhaustMap(
        (
          action //exhaustMap se usa para evitar que se hagan peticiones duplicadas
        ) =>
          this.todoService
            .deleteTodo(action.code) // Se llama al servicio
            .pipe(
              // se tratan los datos obtenidos
              map((resp: any) => {
                // Se retorna la acción getTodosSuccess con los TODOS obtenidos
                // this.generalService.openDialogGeneric('TODO actualizado', 'fa-solid fa-check', 'text-green-500')
                return deleteTodoSuccess({ code: action.code });
              }),
              catchError(() => {
                return [todosError({ error: 'Error al eliminar el TODO' })];
              })
            )
      )
    )
  );
}
