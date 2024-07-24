import { Component, forwardRef, Input } from '@angular/core';
import { ICurrency } from '../../../home/components/interfaces/currency.interface';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySelectComponent),
      multi: true,
    },
  ],
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss'
})
export class CurrencySelectComponent implements ControlValueAccessor {

  @Input() currencies: ICurrency[] = [];
  @Input() uranianCurrency: number = 1;

  public selectedCurrency: number = 0;


  public onChangeSelect(value: string) { };

  public writeValue(value: number): void {
    this.selectedCurrency = value;
  };

  public onTouched: () => void = () => { };

  public registerOnChange(fn: () => void): void {
    this.onChangeSelect = fn;
  };

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
