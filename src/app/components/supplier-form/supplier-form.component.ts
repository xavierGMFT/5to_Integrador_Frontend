// src/app/components/supplier-form/supplier-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier, SupplierService } from '../../services/supplier.service';

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
      this.supplierService.updateSupplier(this.supplier.id, this.supplier).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    } else {
      this.supplierService.createSupplier(this.supplier).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }
}
