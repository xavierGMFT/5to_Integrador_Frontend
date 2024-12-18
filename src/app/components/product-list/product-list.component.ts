import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  deleteProduct(id: number | undefined) {
    if (!id) return;
  
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Recarga la lista de productos
      });
    }
  }
  
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }
}
