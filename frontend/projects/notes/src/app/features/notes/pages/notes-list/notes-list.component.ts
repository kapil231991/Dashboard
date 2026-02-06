import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { Note } from '../../../../models/note.model';
import { NotesService } from '../../../../notes.service';
import { ViewNoteComponent } from '../../components/view-note/view-note.component';

@Component({
    selector: 'app-notes-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [DialogService, ConfirmationService, MessageService],
    templateUrl: './notes-list.component.html',
    styles: [`
    :host ::ng-deep .p-datatable .p-datatable-tbody > tr > td {
      padding: 0.5rem 0.5rem;
    }
  `]
})
export class NotesListComponent implements OnInit {
    private notesService = inject(NotesService);
    private dialogService = inject(DialogService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);

    // Using signal from service directly
    notes = this.notesService.notes;
    ref: DynamicDialogRef | undefined | null;

    constructor() { }

    ngOnInit() { }

    viewNote(note: Note) {
        this.ref = this.dialogService.open(ViewNoteComponent, {
            header: note.title,
            width: '70%',
            contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
            baseZIndex: 10000,
            data: { content: note.content }
        });
    }

    deleteNote(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this note?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.notesService.deleteNote(id).subscribe({
                    next: () => this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Note deleted' }),
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' })
                });
            }
        });
    }
}
