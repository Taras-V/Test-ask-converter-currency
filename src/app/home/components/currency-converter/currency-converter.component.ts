import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICurrency } from '../interfaces/currency.interface';
import { CurrencySelectComponent } from '../../../shared/components/currency-select/currency-select.component';
import { CurrencyInputComponent } from '../../../shared/components/currency-input/currency-input.component';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { CurrencyRatesComponent } from '../currency-rates/currency-rates.component';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CurrencySelectComponent,
    CurrencyInputComponent,
    CurrencyRatesComponent
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})

export class CurrencyConverterComponent implements OnInit {
  public exchangeRates: ICurrency[] = [];
  public uranianCurrency: number = 1;
  public form: FormGroup;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      firstCurrency: [0],
      secondCurrency: [0],
      firstValue: [0],
      secondValue: [{ value: 0, disabled: true }],
    });
  }
  ngOnInit() {

    this.exchangeRateService.getFilteredExchangeRates(['EUR', 'USD', 'PLN'])
      .subscribe((exchangeRates: ICurrency[]) => {
        this.exchangeRates = exchangeRates
        this.setDefaultCurrencies();
      });

    this.form.valueChanges.subscribe(() => {
      this.updateConversion();
    });
  }

  public setDefaultCurrencies(): void {
    const defaultCurrency1 = this.exchangeRates.find((currency) => currency.cc === 'EUR');
    const defaultCurrency2 = this.exchangeRates.find((currency) => currency.cc === 'USD');

    if (defaultCurrency1 && defaultCurrency2) {
      this.form.patchValue({
        firstCurrency: defaultCurrency1.rate,
        secondCurrency: defaultCurrency2.rate,
      });
    }
  }

  public swapCurrencies(): void {
    const { firstCurrency, secondCurrency, firstValue } = this.form.value;

    if (this.isValidNumber(firstCurrency) && this.isValidNumber(secondCurrency)) {
      const newSecondValue = (firstValue * firstCurrency) / secondCurrency;

      this.form.patchValue({
        firstCurrency: secondCurrency,
        secondCurrency: firstCurrency,
        firstValue: newSecondValue,
        secondValue: firstValue
      });
    }
  }

  public updateConversion(): void {
    if (this.form && this.form.controls) {
      const firstCurrency = this.form.controls['firstCurrency'].value;
      const secondCurrency = this.form.controls['secondCurrency'].value;
      const firstValue = this.form.controls['firstValue'].value;

      if (this.isValidNumber(firstCurrency) && this.isValidNumber(secondCurrency)) {
        const secondValue = (firstValue * firstCurrency) / secondCurrency;
        this.form.patchValue({ secondValue }, { emitEvent: false });
      }
    }
  }

  private isValidNumber(value: number): boolean {
    return !isNaN(value) && value !== null && value !== undefined;
  }
}
