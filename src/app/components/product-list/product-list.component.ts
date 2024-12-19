import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;

    // Alerta de confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.loadProducts(); // Recargar la lista
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se puede eliminar este producto porque está relacionado con entradas y salidas de productos.', 'error');
          },
        });
      }
    });
  }
}
