import { Component, OnInit } from '@angular/core';
import { Entry, EntryService } from '../../services/entry.service';

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
    this.entryService.getEntries().subscribe((data) => {
      this.entries = data;
    });
  }

  deleteEntry(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta entrada?')) {
      this.entryService.deleteEntry(id).subscribe(() => {
        this.loadEntries(); // Recarga las entradas después de eliminar
      });
    }
  }
}
