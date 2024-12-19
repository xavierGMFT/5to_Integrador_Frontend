// src/app/components/supplier-list/supplier-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Supplier, SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

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
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(id).subscribe({
          next: () => {
            this.loadSuppliers(); // Recargar la lista de proveedores
            Swal.fire('Eliminado', 'El proveedor ha sido eliminado correctamente.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se puede eliminar este proveedor porque está relacionado con entradas de productos.', 'error');
          },
        });
      }
    });
  }
}
