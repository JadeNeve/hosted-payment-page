import { Card, Text } from '@radix-ui/themes';
import React from 'react';

interface InfoRowCardProps {
  label: string;
  value: string | number | React.ReactNode;
  bold?: boolean;
}

export const InfoRowCard = ({ label, value, bold = true }: InfoRowCardProps) => {
  return (
    <Card>
      <div
        style={{
          borderTop: '1px solid #E3E8EE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '12px 0px',
        }}
      >
        <Text size="2" style={{ color: '#556877' }}>
          {label}
        </Text>

        {typeof value === 'string' || typeof value === 'number' ? (
          <Text size="2" weight={bold ? 'bold' : undefined}>
            {value}
          </Text>
        ) : (
          value
        )}
      </div>
    </Card>
  );
};
