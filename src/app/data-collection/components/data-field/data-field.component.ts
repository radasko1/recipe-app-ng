import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-field',
  template: `
    <div class="block mb-5 relative" [formGroup]="formGroupRef">
      <label [for]="formControlNameRef" class="mb-2 block font-medium">
        {{ title }}
      </label>
      <textarea
        type="text"
        [id]="formControlNameRef"
        [formControlName]="formControlNameRef"
        class="block rounded border outline-0 p-2 w-full"
      ></textarea>
      <!--setting icon-->
      <div class="block absolute top-0 right-0">
        <!--Custom Actions-->
        <ng-template [ngIf]="customActionList && customActionList.length">
          <button
            *ngFor="let action of customActionList"
            type="button"
            class="px-2 rounded bg-black text-white text-sm font-medium mr-2"
            (click)="action.onClick()"
          >
            {{ action.label }}
          </button>
        </ng-template>
        <!--Set to Null Button-->
        <button
          type="button"
          class="px-2 rounded bg-blue-700 text-white text-sm font-medium"
          (click)="toNull()"
        >
          Set to NULL
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DataFieldComponent {
  /** Form reference */
  @Input({ required: true }) formGroupRef!: FormGroup;
  @Input({ required: true }) formControlNameRef!: string;
  /** Label for input field */
  @Input({ required: true }) title!: string;
  //
  @Input() customActionList: any[] | undefined; // TODO type - label, click handler

  /** Set form control value to NULL */
  protected toNull() {
    const control = this.formGroupRef.get(this.formControlNameRef);
    if (!control) {
      return;
    }
    control.setValue(null);
  }
}
