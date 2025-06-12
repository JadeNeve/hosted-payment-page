import { Box, Strong, Text } from '@radix-ui/themes';
import React from 'react';
import { InfoRowCard } from '../InfoRowCard/InfoRowCard';
import { FadeLoader } from 'react-spinners';

interface ContainerProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  amount?: string | number;
  reference?: string;
  button?: React.ReactNode;
  timer?: string;
  currency?: string;
  amountDue?: string;
  icon?: React.ReactNode;
  isRefetching?: boolean;
  loadingColor?: string;
}

export const Container = ({
  children,
  title,
  description,
  amount,
  reference,
  button,
  timer,
  amountDue,
  currency = 'ZAR',
  icon,
  isRefetching = false,
  loadingColor = '#3F53DD',
}: ContainerProps) => {
  return (
    <Box
      p="4"
      style={{
        maxWidth: 400,
        margin: '10rem auto',
        padding: '1rem',
        backgroundColor: '#FFFFFF',
        borderRadius: '7px',
      }}
    >
      {icon && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          {icon}
        </div>
      )}

      <Text
        as="p"
        style={{
          fontSize: '20px',
          color: '#0F172A',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {amount && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Text
            style={{
              fontSize: '32px',
              color: '#0F172A',
              textAlign: 'center',
            }}
          >
            {amount}
          </Text>
          <Text
            style={{
              fontSize: '14px',
              color: '#0F172A',
              textAlign: 'center',
              margin: '15px 5px',
            }}
          >
            {currency}
          </Text>
        </div>
      )}

      {description && (
        <Text
          as="p"
          style={{
            fontSize: '14px',
            color: '#64748B',
            textAlign: 'center',
            marginTop: '4px',
            padding: '0px 40px',
          }}
        >
          {description}
        </Text>
      )}

      {reference && (
        <Text
          as="p"
          style={{
            fontSize: '14px',
            color: '#64748B',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          For reference number: <Strong style={{color: "#0F172A"}}>{reference}</Strong>
        </Text>
      )}

      {children}

      {amountDue && (
        <InfoRowCard
          label="Amount due:"
          value={
            isRefetching ? (
              <FadeLoader height={8} width={2} margin={-4} color={loadingColor} />
            ) : (
              amountDue
            )
          }
        />
      )}

      {timer && (
        <InfoRowCard
          label="Quoted price expires in:"
          value={
            isRefetching ? (
              <FadeLoader height={8} width={2} margin={-4} color={loadingColor} />
            ) : (
              timer
            )
          }
        />
      )}

      {button && <Box mt="3">{button}</Box>}
    </Box>
  );
};
