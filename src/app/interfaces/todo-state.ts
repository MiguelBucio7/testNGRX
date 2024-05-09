import { Product } from "./clients";
import { Todo } from "./todo.interface";


export interface TodoState {
    todos: Product[],
    loading: boolean,
    error?: string
}