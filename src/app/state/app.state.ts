import { ActionReducerMap } from "@ngrx/store";
import { _todoReducer } from "./reducers/todo.reducers";
import { TodoState } from "../interfaces/todo-state";

export interface AppState {
    todos: TodoState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    todos: _todoReducer
};