// src/app/components/supplier-list/supplier-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Supplier, SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }

  deleteSupplier(id: number | null) {
    if (id === null) return;
    if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      this.supplierService.deleteSupplier(id).subscribe(() => {
        this.loadSuppliers();
      });
    }
  }
}
