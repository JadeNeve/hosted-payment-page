export interface CurrencyAmount {
    amount: number;
    currency: string;
    actual: number;
  }
  
  export interface Address {
    address: string;
    tag: string | null;
    protocol: string;
    uri: string;
    alternatives: string[];
  }
  
  export interface Transaction {
    id: string;
    type: string;
    status: string;
    amount: CurrencyAmount;
    timestamp: number;
  }
  
  export interface Refund {
    id: string;
    reason: string;
    amount: CurrencyAmount;
    timestamp: number;
    status: string;
  }
  
  export interface QuoteSummary {
    uuid: string;
    merchantDisplayName: string;
    merchantId: string;
    dateCreated: number;
    expiryDate: number;
    quoteExpiryDate: number | null;
    acceptanceExpiryDate: number | null;
    quoteStatus: 'TEMPLATE' | 'ACCEPTED';
    reference: string;
    type: string;
    subType: string;
    status: 'PENDING' | 'EXPIRED';
    displayCurrency: CurrencyAmount;
    walletCurrency: CurrencyAmount;
    paidCurrency: CurrencyAmount;
    feeCurrency: CurrencyAmount;
    displayRate: {
      base: string;
      counter: string;
      rate: number;
    } | null;
    exchangeRate: {
      base: string;
      counter: string;
      rate: number;
    } | null;
    address: Address | null;
    returnUrl: string;
    redirectUrl: string;
    transactions: Transaction[];
    refund: Refund | null;
    refunds: Refund[];
  }
  
  export interface UpdateQuotePayload {
    currency: 'BTC' | 'ETH' | 'LTC';
    payInMethod: 'crypto';
  }
  
  export interface AcceptQuotePayload {
    successUrl: string;
  }
  