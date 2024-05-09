import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

// Selector para obtener el estado de los todos
export const selectTodoState = (state: AppState) => state.todos;

// Selector para obtener el estado de carga
export const selectLoading = createSelector(
    selectTodoState, // Selecciona el estado de los todos    
    (state) => state.loading
);

// Selector para obtener los todos pendientes
export const selectTodos = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    (state) => state.todos
);

// Selector para obtener los todos en progreso
export const selectTodosInProgress = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Filtra los todos por aquellos que tienen un estado con ID 2 (en progreso)
    //TODO: FALTA METER FILTRO POR CARACTERISTICA
    (state) => state.todos
);

// Selector para obtener los todos completados
export const selectTodosDone = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Filtra los todos por aquellos que tienen un estado con ID 3 (completados)
        //TODO: FALTA METER FILTRO POR CARACTERISTICA
    (state) => state.todos
);

// Selector para obtener el estado de error
export const selectError = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Función que devuelve la propiedad `error` del estado de los todos
    (state) => state.error
);
