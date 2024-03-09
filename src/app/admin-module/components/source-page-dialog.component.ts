import { Component, Inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataCollectionService } from '../services/data-collection.service';

@Component({
  selector: 'app-source-page-dialog',
  template: `
    <h2 mat-dialog-title>Add page to the source</h2>
    <mat-dialog-content>
      <textarea
        id="url"
        [formControl]="form"
        placeholder="Write URL here.."
        rows="3"
        cols="70"
      ></textarea>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        type="button"
        class="block rounded px-4 py-2 bg-blue-700 text-white"
        (click)="createLink()"
      >
        Create
      </button>
    </mat-dialog-actions>
  `,
})
export class SourcePageDialogComponent {
  protected readonly form = this.fb.control<string>('', { validators: [Validators.required] });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: { sourceId: number },
    private readonly dialogRef: MatDialogRef<SourcePageDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly dataCollectionService: DataCollectionService
  ) {}

  protected createLink() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const id = this.data.sourceId;
    const link = this.form.value;
    this.dataCollectionService.addSourceLink(id, link).subscribe((res) => {
      this.form.reset();
      this.dialogRef.close();
    });
  }
}
