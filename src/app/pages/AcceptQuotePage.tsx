import { useParams, useNavigate } from 'react-router-dom';
import { useQuoteSummary } from '../../hooks/useQuoteSummary';
import { useUpdateQuote } from '../../hooks/useUpdateQuote';
import { useAcceptQuote } from '../../hooks/useAcceptQuote';
import { useCountdown } from '../../hooks/useCountdown';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { SelectCurrency } from '../../components/ui/SelectCurrency/SelectCurrency';
import ChevronIcon from '../../assets/chevron';
import { Container } from '../../components/ui/Container/Container';
import FadeLoader from 'react-spinners/FadeLoader';


const AcceptQuotePage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [shouldShowDetails, setShouldShowDetails] = useState(false);

  const { data: quote, isPending, isRefetching, refetch } = useQuoteSummary(uuid!);
  const updateQuote = useUpdateQuote();
  const acceptQuote = useAcceptQuote();

  const countdown = useCountdown({
    expiry: quote?.acceptanceExpiryDate ?? null,
    onExpire: () => {
      if (!uuid || !selectedCurrency) return;
      updateQuote.mutate(
        {
          uuid,
          payload: {
            currency: selectedCurrency as 'BTC' | 'ETH' | 'LTC',
            payInMethod: 'crypto',
          },
        },
        {
          onSuccess: () => refetch(),
        }
      );
    },
  });

  useEffect(() => {
    if (quote?.acceptanceExpiryDate && Date.now() >= quote.acceptanceExpiryDate) {
      navigate(`/payin/${uuid}/expired`, { replace: true });
    }
  }, [quote?.acceptanceExpiryDate, navigate, uuid]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setShouldShowDetails(false);

    updateQuote.mutate(
      {
        uuid: uuid!,
        payload: {
          currency: value as 'BTC' | 'ETH' | 'LTC',
          payInMethod: 'crypto',
        },
      },
      {
        onSuccess: () => {
          refetch();
          setShouldShowDetails(true);
        },
      }
    );
  };

  const handleConfirm = () => {
    console.log('working?')
    acceptQuote.mutate(
      {
        uuid: uuid!,
        payload: { successUrl: 'no_url' },
      },
      {
        onSuccess: () => navigate(`/payin/${uuid}/pay`),
      }
    );
  };

if (isPending || !quote ) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <FadeLoader color="#0F172A" />
    </div>
  );
}

  const isQuoteReady =
    !isRefetching &&
    quote.paidCurrency?.amount &&
    quote.paidCurrency?.currency &&
    countdown.formatted &&
    selectedCurrency;

  return (
    <Container
      title={"Merchant Display Name"}
      amount={`${quote.displayCurrency.amount}`}
      currency={`${quote.displayCurrency.currency}`}
      reference={quote.reference}
        timer={shouldShowDetails ? countdown.formatted : undefined}
      amountDue={
        shouldShowDetails
          ? `${quote.paidCurrency.amount} ${quote.paidCurrency.currency}`
          : undefined
      }
      button={
        shouldShowDetails && (
          <Button
            onClick={handleConfirm}
            disabled={
              acceptQuote.isPending ||
              updateQuote.isPending ||
              !isQuoteReady ||
              isRefetching
            }
            loading={acceptQuote.isPending}
            fullWidth
          >
            Confirm
          </Button>
        )
      }
    >
      <SelectCurrency
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        CustomIcon={<ChevronIcon />}
      />
    </Container>
  );
};

export default AcceptQuotePage;
