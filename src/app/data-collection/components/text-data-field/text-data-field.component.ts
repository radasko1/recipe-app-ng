import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataFieldCustomAction } from '../../../admin-module/models/data-field-custom-action.type';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import locale from './text-data-field.locale.json';

@Component({
  selector: 'app-text-data-field',
  template: `
    <div class="block mb-5 relative">
      <label class="mb-2 block font-medium">
        {{ title }}
      </label>
      <textarea
        type="text"
        [value]="textValue"
        class="block rounded border outline-0 p-2 w-full"
        [class.border-red-600]="textValue === null"
        (change)="valueChange($event)"
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
          {{ locale[lang.language].NullButtonLabel }}
        </button>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextDataFieldComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextDataFieldComponent implements ControlValueAccessor {
  /** Label for input field */
  @Input({ required: true }) title!: string;
  /** List of custom actions */
  @Input() customActionList: DataFieldCustomAction[] | undefined;

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  protected readonly locale = locale;
  protected textValue: string | null = '';

  constructor(protected readonly lang: LanguageService) {}

  writeValue(value: string | null) {
    this.textValue = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Change event handler
   * @param event Change event
   */
  protected valueChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.textValue = target.value;
    this.onChange(target.value);
  }

  /** Set form control value to NULL */
  protected toNull() {
    this.textValue = null;
    this.onChange(null);
  }
}
