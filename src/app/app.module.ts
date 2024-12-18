import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ExitFormComponent } from './components/exit-form/exit-form.component';
import { ExitListComponent } from './components/exit-list/exit-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    SupplierListComponent,
    SupplierFormComponent,
    EntryListComponent,
    EntryFormComponent,
    ExitFormComponent,
    ExitListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // Importa el módulo HttpClient aquí
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
