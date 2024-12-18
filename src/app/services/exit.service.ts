import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface Exit {
  id?: number;
  product: Product;
  quantity: number;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExitService {
  private apiUrl = 'http://localhost:8080/api/exits';

  constructor(private http: HttpClient) {}

  getExits(): Observable<Exit[]> {
    return this.http.get<Exit[]>(this.apiUrl);
  }

  createExit(exit: Exit): Observable<Exit> {
    return this.http.post<Exit>(this.apiUrl, exit);
  }

  deleteExit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
