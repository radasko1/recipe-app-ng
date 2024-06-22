import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { DataFieldCustomAction } from '../../../admin-module/models/data-field-custom-action.type';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFieldComponent implements ControlValueAccessor {
  /** Label for input field */
  @Input({ required: true }) title!: string;
  /** List of custom actions */
  @Input() customActionList: DataFieldCustomAction[] | undefined;

  // TODO add error message
  // TODO add form control validator

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  protected numberValue: number | null = 0;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    protected readonly lang: LanguageService
  ) {}

  writeValue(value: number | null) {
    this.numberValue = value;
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
    this.numberValue = parseInt(target.value);
    this.onChange(target.value);
  }

  /** Set form control value to NULL */
  protected toNull() {
    this.numberValue = null;
    this.onChange(null);
  }
}
