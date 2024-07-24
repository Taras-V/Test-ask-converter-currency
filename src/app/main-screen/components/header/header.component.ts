import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICurrency } from '../../../home/components/interfaces/currency.interface';
import { ExchangeRateService } from '../../../home/components/services/exchange-rate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public exchangeRates: ICurrency[] = [];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {

    this.exchangeRateService.getFilteredExchangeRates(['EUR', 'USD']).subscribe((exchangeRates: ICurrency[]) => {
      this.exchangeRates = exchangeRates
    });

  }

}
