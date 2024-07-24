import { Injectable } from '@angular/core';
import { CurrencyService } from './currency.service';
import { map, Observable } from 'rxjs';
import { ICurrency } from './../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private currencyService: CurrencyService) { }

  public getFilteredExchangeRates(currencies: string[]): Observable<ICurrency[]> {
    return this.currencyService.getExchangeCurrency().pipe(
      map((dataCurrency: ICurrency[]) =>
        dataCurrency.filter((item: ICurrency) => currencies.includes(item.cc))
      )
    );
  }

}
