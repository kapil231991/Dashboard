import { Injectable, signal, computed, inject } from '@angular/core';
import { Note } from './models/note.model';
import { HttpService } from './core/services/http.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesService {

    private http = inject(HttpService);

    // Signal source of truth
    private readonly _notes = signal<Note[]>([]);

    readonly notes = computed(() => this._notes());

    constructor() {
        this.loadNotes();
    }

    loadNotes() {
        this.http.get<Note[]>('/notes').subscribe({
            next: (data) => this._notes.set(data),
            error: (err) => console.error('Failed to load notes', err)
        });
    }

    getNotes() {
        return this.notes;
    }

    addNote(note: Note) {
        return this.http.post<Note>('/notes', note).pipe(
            tap(newNote => {
                this._notes.update(current => [...current, newNote]);
            })
        );
    }

    updateNote(id: number, note: Note) {
        return this.http.put<Note>(`/notes/${id}`, note).pipe(
            tap(updatedNote => {
                this._notes.update(current =>
                    current.map(n => n.id === id ? updatedNote : n)
                );
            })
        );
    }

    deleteNote(id: number) {
        return this.http.delete<void>(`/notes/${id}`).pipe(
            tap(() => {
                this._notes.update(current => current.filter(n => n.id !== id));
            })
        );
    }
}
