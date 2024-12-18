import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: null, // Cambia de 0 a null
    name: '',
    quantity: 0,
    price: 0
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
          this.router.navigate(['/products']);
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    } else {
      // Crear nuevo producto
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (err) => console.error('Error al crear producto:', err),
      });
    }
  }
}
