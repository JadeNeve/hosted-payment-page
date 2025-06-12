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

  export interface CreateQuotePayload {
  merchantId: string;
  type: 'IN';
  amount: number;
  currency: 'ZAR';
  expiryMinutes: number;
  reference: string;
  customerId: string;
  complianceDetails: {
    requesterIpAddress: string;
    partyDetails: {
      type: 'ORIGINATOR';
      entityType: 'INDIVIDUAL';
      relationshipType: 'SELF_OWNED';
      firstName: string;
      middleName: string;
      lastName: string;
      dateOfBirth: string;
    }[];
  };
}

export interface QuoteResponse {
  uuid: string;
  currency: 'ZAR';
  amount: number;
  reference: string;
}

export interface UseCountdownProps {
  expiryDate?: number;
  onComplete?: () => void;
}

export interface TimeLeft {
  days: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  isComplete: boolean;
}
  