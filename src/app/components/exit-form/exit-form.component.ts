import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exit, ExitService } from '../../services/exit.service';
import { Product, ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
})
export class ExitFormComponent implements OnInit {
  exit: Partial<Exit> = {
    product: undefined,
    quantity: 0,
  };
  products: Product[] = [];

  constructor(
    private exitService: ExitService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => (this.products = data));
  }

  saveExit(): void {
    if (this.exit.product && this.exit.quantity) {
      this.exitService.createExit(this.exit as Exit).subscribe({
        next: () => {
          Swal.fire('Creado', 'La salida ha sido registrada correctamente.', 'success');
          this.router.navigate(['/exits']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo registrar la salida.', 'error');
        },
      });
    }
  }
}
