import { Component, Input } from '@angular/core';
import { ICurrency } from './../interfaces/currency.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-rates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-rates.component.html',
  styleUrl: './currency-rates.component.scss'
})
export class CurrencyRatesComponent {

  @Input() exchangeRates: ICurrency[] = [];
}
