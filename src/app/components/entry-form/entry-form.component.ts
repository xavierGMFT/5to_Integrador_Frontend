import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry, EntryService } from '../../services/entry.service';
import { Product, ProductService } from '../../services/product.service';
import { Supplier, SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
})
export class EntryFormComponent implements OnInit {
  entry: Partial<Entry> = {
    product: undefined,
    supplier: undefined,
    quantity: 0,
  };
  products: Product[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private entryService: EntryService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSuppliers();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => (this.products = data));
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((data) => (this.suppliers = data));
  }

  saveEntry(): void {
    if (this.entry.product && this.entry.supplier && this.entry.quantity) {
      this.entryService.createEntry(this.entry as Entry).subscribe(() => {
        this.router.navigate(['/entries']);
      });
    }
  }
}
