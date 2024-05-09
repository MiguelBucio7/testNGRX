import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateTodo, UpdateTodo } from '../interfaces/todo.interface';
import { ClientService } from './clientservice';
import { Product } from '../interfaces/clients';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private clientService: ClientService) { }

  getProductsData(): Product[] {
    return [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            category: 'Accessories',
            quantity: 24,
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            category: 'Accessories',
            quantity: 61,
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            category: 'Fitness',
            quantity: 2,
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            category: 'Clothing',
            quantity: 25,
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            category: 'Accessories',
            quantity: 73,
        },
        {
            id: '1005',
            code: 'av2231fwg',
            name: 'Brown Purse',
            category: 'Accessories',
            quantity: 0,
        },
    ];
}

  // Peticiones
  getTodos(): Observable<any> {
    return of(this.getProductsData());
  }

  createTodo(todo: Product): Observable<any> {
    const todoR= {
      ...todo,
      code: String(todo.code),
      id: String(todo.id),
      quantity: Number(todo.quantity)
    }
    this.getProductsData().push(todoR);
    console.log('ttt', this.getProductsData());
    return of(todoR);
  }

  deleteTodo(id: string): Observable<Object> {
    return of(this.getProductsData());

  }

  updateTodo( product: Product): Observable<Object> {
    const getRowI = this.getProductsData().findIndex(t => t.code === product.code);
    const f = this.getProductsData()[getRowI] = product;
    return of(f)

  }

  updateStatus(nuevoEstado: number, id: string): Observable<Object> {
    return of();
  }

}
