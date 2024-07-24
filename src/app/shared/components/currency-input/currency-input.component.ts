import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss'
})
export class CurrencyInputComponent {

  public value: number = 0;
  public formattedValue: string = '0';

  @Input() isDisabled: boolean = false;

  public onChange: (value: number) => void = () => { };

  public onTouched: () => void = () => { };

  public writeValue(value: number): void {
    this.value = value;
    this.formattedValue = this.formatValue(value);
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const parsedValue = parseFloat(input.value);

    if (!isNaN(parsedValue)) {
      this.value = parsedValue;
      this.onChange(this.value);
    } else {
      this.onChange(this.value);
    }
  }
  private formatValue(value: number): string {
    return value.toFixed(2);
  }

}
