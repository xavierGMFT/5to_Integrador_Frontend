import { Component, OnInit } from '@angular/core';
import { Exit, ExitService } from '../../services/exit.service';

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
    this.exitService.getExits().subscribe((data) => (this.exits = data));
  }

  deleteExit(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta salida?')) {
      this.exitService.deleteExit(id).subscribe(() => {
        this.loadExits(); // Recarga las salidas después de eliminar
      });
    }
  }
}
