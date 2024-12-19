import { Component, OnInit } from '@angular/core';
import { Entry, EntryService } from '../../services/entry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.entryService.getEntries().subscribe({
      next: (data) => {
        this.entries = data;
      },
      error: (err) => {
        console.error('Error al cargar entradas:', err);
        Swal.fire('Error', 'No se pudieron cargar las entradas.', 'error');
      },
    });
  }

  deleteEntry(id: number): void {
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
        this.entryService.deleteEntry(id).subscribe({
          next: () => {
            this.loadEntries();
            Swal.fire('Eliminado', 'La entrada ha sido eliminada.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la entrada.', 'error');
          },
        });
      }
    });
  }
}
