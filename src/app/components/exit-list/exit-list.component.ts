import { Component, OnInit } from '@angular/core';
import { Exit, ExitService } from '../../services/exit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exit-list',
  templateUrl: './exit-list.component.html',
})
export class ExitListComponent implements OnInit {
  exits: Exit[] = [];

  constructor(private exitService: ExitService) {}

  ngOnInit(): void {
    this.loadExits();
  }

  loadExits(): void {
    this.exitService.getExits().subscribe({
      next: (data) => {
        this.exits = data;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las salidas.', 'error');
      },
    });
  }

  deleteExit(id: number): void {
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
        this.exitService.deleteExit(id).subscribe({
          next: () => {
            this.loadExits();
            Swal.fire('Eliminado', 'La salida ha sido eliminada.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la salida.', 'error');
          },
        });
      }
    });
  }
}
