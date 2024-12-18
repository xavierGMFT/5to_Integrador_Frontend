import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number | null;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(catchError(this.handleError));
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product).pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => new Error('Ocurrió un error, por favor intenta nuevamente.'));
  }
}
