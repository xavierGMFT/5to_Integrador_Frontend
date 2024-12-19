import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: null,
    name: '',
    quantity: 0,
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe((data) => (this.product = data));
    }
  }

  saveProduct() {
    if (this.product.id !== null) {
      // Actualizar producto existente
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'El producto se actualizó correctamente.', 'success');
          this.router.navigate(['/products']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
        },
      });
    } else {
      // Crear nuevo producto
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          Swal.fire('Creado', 'El producto se creó correctamente.', 'success');
          this.router.navigate(['/products']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear el producto.', 'error');
        },
      });
    }
  }
}
