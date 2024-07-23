import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICurrency } from '../interfaces/currency.interface';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})

export class CurrencyConverterComponent implements OnInit {

  public exchangeRates: ICurrency[] = [];
  public uranianCurrency: number = 1;
  public inputValue: string | number = 0;
  public selectedCurrency: number = 0;
  public selectedCurrency2: number = 0;
  public isSecondInputDisabled: boolean = true;
  public valueFromInput: number = 0;

  @ViewChild('inputRef') inputRef!: ElementRef;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getExchangeCurrency().subscribe((dataCurrency: ICurrency[]) => {
      dataCurrency.forEach((item: ICurrency) => {
        if (item.cc === 'EUR' || item.cc === 'USD' || item.cc === 'PLN') {
          this.exchangeRates.push(item);
        }
        this.setDefaultCurrencies();
      });
    });
  }

  public handleInputChange(inputValue: string, reverse: boolean = false): void {
    this.valueFromInput = parseFloat(inputValue);

    if (this.selectedCurrency && this.selectedCurrency2) {
      if (reverse) {
        this.inputValue = (this.valueFromInput * this.selectedCurrency2) / this.selectedCurrency;
      } else {
        this.inputValue = (this.valueFromInput * this.selectedCurrency) / this.selectedCurrency2;
      }
    }
  }

  public handleCurrencyChange(): void {
    this.inputValue = 0;
    if (this.inputRef) {
      this.inputRef.nativeElement.value = '';
    }
  }

  setDefaultCurrencies(): void {
    const defaultCurrency1 = this.exchangeRates.find((currency) => currency.cc === 'EUR');
    const defaultCurrency2 = this.exchangeRates.find((currency) => currency.cc === 'USD');

    if (defaultCurrency1 && defaultCurrency2) {
      this.selectedCurrency = defaultCurrency1.rate;
      this.selectedCurrency2 = defaultCurrency2.rate;
    }
  }

  public swapCurrencies(): void {
    const tempCurrency = this.selectedCurrency;
    this.selectedCurrency = this.selectedCurrency2;
    this.selectedCurrency2 = tempCurrency;

    if (this.selectedCurrency && this.selectedCurrency2) {
      this.inputValue = (this.valueFromInput * this.selectedCurrency) / this.selectedCurrency2;
    }
  }
}
