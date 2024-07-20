import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../../home/components/services/currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public exchangeRates: any = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {

    this.currencyService.getExchangeCurrency().subscribe(dataCurrency => {
      dataCurrency.map((item: any) => {
        if (item.cc === 'EUR' || item.cc === 'USD') {
          return this.exchangeRates.push(item);
        }
      });

    });

  }

}
