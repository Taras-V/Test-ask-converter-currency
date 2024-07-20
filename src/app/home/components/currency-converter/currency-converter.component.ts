import { Component, OnInit, ViewChild } from '@angular/core';
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
  public valueFromInput: number= 0;

  @ViewChild('inputRef') inputRef: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getExchangeCurrency().subscribe(dataCurrency => {
      dataCurrency.forEach((item: any) => {
        if (item.cc === 'EUR' || item.cc === 'USD' || item.cc === 'PLN') {
          this.exchangeRates.push(item);
        }
        this.setDefaultCurrencies();
      });
    });
  }

  public handleInputChange(inputValue: any): void {
    this.valueFromInput = inputValue;

    if (this.selectedCurrency && this.selectedCurrency2) {
      this.inputValue = (inputValue * this.selectedCurrency) / this.selectedCurrency2;
    }
  }

  public handleInputChange2(inputValue: any): void {
    if (this.selectedCurrency && this.selectedCurrency2) {
      this.inputValue = (inputValue * this.selectedCurrency2) / this.selectedCurrency;
    }
  }

  public handleCurrencyChange(): void {
    this.inputValue = 0;
    if (this.inputRef) {
      this.inputRef.nativeElement.value = '';
    }
  }

  setDefaultCurrencies(): void {
    const defaultCurrency1 = this.exchangeRates.find((currency: any) => currency.cc === 'EUR');
    const defaultCurrency2 = this.exchangeRates.find((currency: any) => currency.cc === 'USD');

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
