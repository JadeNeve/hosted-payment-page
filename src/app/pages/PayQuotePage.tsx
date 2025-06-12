import { useParams, useNavigate } from 'react-router-dom';
import { useQuoteSummary } from '../../hooks/useQuoteSummary';
import { useCountdown } from '../../hooks/useCountdown';
import { copyToClipboard } from '../../utils/copyToClipboard';
import QRCode from 'react-qr-code';
import { Container } from '../../components/ui/Container/Container';
import { Box, Flex, Text } from '@radix-ui/themes';
import { InfoRowCard } from '../../components/ui/InfoRowCard/InfoRowCard';
import { useEffect, useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const PayQuotePage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<null | 'amount' | 'address'>(null);

  const { data: quote, isPending } = useQuoteSummary(uuid!);

  const countdown = useCountdown({
    expiry: quote?.expiryDate ?? null,
    onExpire: () => {
      navigate(`/payin/${uuid}/expired`);
    },
  });

  const amount = quote?.paidCurrency?.amount;
  const currency = quote?.paidCurrency?.currency;
  const address = quote?.address?.address;
  const qrValue = quote?.address?.uri;

  const truncateAddress = (addr: string) =>
    addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-6)}` : addr;

  const handleCopy = (text: string, type: 'amount' | 'address') => {
    copyToClipboard(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
  const now = Date.now();
  if (quote?.expiryDate && now >= quote.expiryDate) {
    navigate(`/payin/${uuid}/expired`, { replace: true });
  }
}, [quote?.expiryDate, navigate, uuid]);

if (isPending || !quote || !amount || !address || !qrValue) {
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

  return (
    <Container 
      title={"Pay with Bitcoin"}
      description={"To complete this payment send the amount due to the BTC address provided below."}
    >
      <InfoRowCard
        label="Amount due:"
        value={
          <Flex gap="3" align="center">
            <Text>{amount} {currency}</Text>
            <Text
            size={"2"}
              style={{
                color: '#3F53DD',
                cursor: 'pointer',
                paddingLeft: '12px'
              }}
              onClick={() => handleCopy(`${amount}`, 'amount')}
            >
              {copiedField === 'amount' ? 'Copied!' : 'Copy'}
            </Text>
          </Flex>
        }
        bold={false}
      />

      <InfoRowCard
        label="BTC address:"
        value={
          <Flex gap="3" align="center">
            <Text>{truncateAddress(address)}</Text>
            <Text
            size={"2"}
              style={{
                color: '#3F53DD',
                cursor: 'pointer',
                paddingLeft: '12px'
              }}
              onClick={() => handleCopy(address, 'address')}
            >
              {copiedField === 'address' ? 'Copied!' : 'Copy'}
            </Text>
          </Flex>
        }
        bold={false}
      />

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '25px 0px'
        }}
      >
        <QRCode value={qrValue} size={160} />
        <span style={{ marginTop: '12px', color: '#556877' }}>{address}</span>
      </Box>

      <InfoRowCard label="Time left to pay:" value={countdown.formatted} />
    </Container>
  );
};

export default PayQuotePage;
