import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  templateUrl: 'text-data-field.component.html',
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

  constructor(
    private readonly cdr: ChangeDetectorRef,
    protected readonly lang: LanguageService
  ) {}

  writeValue(value: string | null) {
    this.textValue = value;
    this.cdr.markForCheck();
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
