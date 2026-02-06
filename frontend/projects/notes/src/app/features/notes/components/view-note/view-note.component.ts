import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-view-note',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <div class="p-3">
      <div [innerHTML]="content"></div>
      <div class="d-flex justify-content-end mt-4">
        <button pButton label="Close" (click)="close()"></button>
      </div>
    </div>
  `
})
export class ViewNoteComponent implements OnInit {
    content = '';

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        this.content = this.config.data?.content || '<p>No content</p>';
    }

    close() {
        this.ref.close();
    }
}
