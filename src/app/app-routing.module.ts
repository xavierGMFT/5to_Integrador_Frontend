import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ExitListComponent } from './components/exit-list/exit-list.component';
import { ExitFormComponent } from './components/exit-form/exit-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'suppliers/new', component: SupplierFormComponent },
  { path: 'suppliers/edit/:id', component: SupplierFormComponent },
  { path: 'entries', component: EntryListComponent },
  { path: 'entries/new', component: EntryFormComponent },
  { path: 'exits', component: ExitListComponent },
  { path: 'exits/new', component: ExitFormComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirige cualquier ruta desconocida

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
//funcional