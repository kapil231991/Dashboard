import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { NotesService } from '../../../../notes.service';
import { Note } from '../../../../models/note.model';

@Component({
    selector: 'app-add-edit-note',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        InputTextModule,
        EditorModule,
        ButtonModule
    ],
    templateUrl: './add-edit-note.component.html'
})
export class AddEditNoteComponent implements OnInit {
    form: FormGroup;
    isEditMode = false;
    noteId?: number;
    title = 'Add Note';
    submitLabel = 'Create Note';

    constructor(
        private fb: FormBuilder,
        private notesService: NotesService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.noteId = +id;
            this.title = 'Edit Note';
            this.submitLabel = 'Update';
            this.loadNote(this.noteId);
        }
    }

    loadNote(id: number) {
        const note = this.notesService.getNotes()().find(n => n.id === id);
        if (note) {
            this.form.patchValue({
                title: note.title,
                content: note.content
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Not Found', detail: 'Note not found locally' });
            this.router.navigate(['/notes'], { relativeTo: this.route });
        }
    }

    submit() {
        if (this.form.invalid) return;

        const payload = this.form.value;

        if (this.isEditMode && this.noteId) {
            this.notesService.updateNote(this.noteId, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Note updated' });
                    this.router.navigate(['/notes'], { relativeTo: this.route });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update' })
            });
        } else {
            this.notesService.addNote(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Note created' });
                    this.router.navigate(['/notes'], { relativeTo: this.route });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create' })
            });
        }
    }
}
