import { CurrencyCode } from './Currency';

export type ExchangeRates = {
    [key in CurrencyCode]: number;
};
