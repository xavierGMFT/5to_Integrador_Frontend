import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';
import { Supplier } from './supplier.service';

export interface Entry {
  id: number;
  product: Product;
  supplier: Supplier;
  quantity: number;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private baseUrl = 'http://localhost:8080/api/entries';

  constructor(private http: HttpClient) {}

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.baseUrl);
  }

  createEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.baseUrl, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
