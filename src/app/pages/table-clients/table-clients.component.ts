import { Component } from '@angular/core';
import { PrimeModule } from '../../prime.module';
import { MessageService, SelectItem } from 'primeng/api';
import { ClientService } from '../../services/clientservice';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
//NGRX ACTIONS
import { createTodoRequest, deleteTodoRequest, getTodosRequest, updateProductRequest } from '../../state/actions/todo.actions';
import { selectTodos } from '../../state/selectors/todo.selectors';
import { Product } from '../../interfaces/clients';


@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrl: './table-clients.component.scss',
  standalone: true,
  imports: [PrimeModule, FormsModule, ReactiveFormsModule],
  providers:[ClientService, MessageService]
})
export class TableClientsComponent {
  statuses!: SelectItem[];
  clonedProducts: { [s: string]: any } = {};
  productEdit!: Product | null;
  products: Product[] = [];
  formProduct!: FormGroup;
  //intancias d elas propiedades
  tasksInProgress: Observable<Todo[]> = new Observable()
  tasksCompleted: Observable<Todo[]> = new Observable()

  constructor(
    private clienService: ClientService,
    private messageService: MessageService,
    private store: Store<AppState>, // Inyecta el servicio Store de NgRx para gestionar el estado de la aplicación,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.createForm();
    this.store.dispatch(getTodosRequest()) // llama a la acción para obtener los todos
    this.store.select(selectTodos).subscribe(r => {
      console.log('redd', r);
      this.products = r});
    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  createForm(): void {
    this.formProduct = this.fb.group({
      code: [''],
      name: ['', [Validators.required]],
      category: ['',[Validators.required]],
      quantity: ['', [Validators.required]],
    })
  }
  onRowEditSave(product: Product) {
    console.log('product', product);
    if(this.products.find((r) => product)){
      console.log('dispatch update');
      /* this.store.dispatch(updateProductRequest({ code: product.code as string, todo: product })) */
    }
    /* if (product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    } */
  }

  onRowEditCancel(product: Product, index: number) {
   /*  this.client[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string]; */
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  editAddItem(product? : Product): void{
    if(product){
      this.productEdit = product as Product;
      if(this.products.find((r) => r.code === product.code)){
        this.formProduct.patchValue(product);
      }
    }else {
      const addForm = {
        ...this.formProduct.value,
        code: this.products.length + 1,
        id: this.products.length + 2
      }
      this.store.dispatch(createTodoRequest({ todo: addForm }));
      console.log('add action', addForm);
      this.cancelAction();
    }
  }

  editAction(){
    const formD = this.formProduct.value as unknown as Product;
    this.store.dispatch(updateProductRequest({ code: formD.code as string, todo: formD }));
    
    this.cancelAction();
  }

  deleteItem(code: number): void{
    this.store.dispatch(deleteTodoRequest({ code: String(code) }))
  }

  cancelAction(): void{
    this.createForm();
    this.productEdit = null
  }
}
