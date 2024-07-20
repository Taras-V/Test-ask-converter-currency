import { Component } from '@angular/core';
import { InfoCurrencyComponent } from '../info-currency/info-currency.component';
import { CurrencyConverterComponent } from '../currency-converter/currency-converter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InfoCurrencyComponent, CurrencyConverterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
