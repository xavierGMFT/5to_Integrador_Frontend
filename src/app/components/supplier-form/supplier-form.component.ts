// src/app/components/supplier-form/supplier-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier, SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent implements OnInit {
  supplier: Supplier = {
    id: null,
    name: '',
    contact: '',
    address: '',
  };

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supplierService.getSupplierById(+id).subscribe((data) => {
        this.supplier = data;
      });
    }
  }

  saveSupplier() {
    if (this.supplier.id !== null) {
      this.supplierService.updateSupplier(this.supplier.id, this.supplier).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'El proveedor se ha actualizado correctamente.', 'success');
          this.router.navigate(['/suppliers']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el proveedor.', 'error');
        },
      });
    } else {
      this.supplierService.createSupplier(this.supplier).subscribe({
        next: () => {
          Swal.fire('Creado', 'El proveedor se ha creado correctamente.', 'success');
          this.router.navigate(['/suppliers']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear el proveedor.', 'error');
        },
      });
    }
  }
}
