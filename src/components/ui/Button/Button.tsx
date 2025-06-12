import {
  Button as RadixButton,
  type ButtonProps as RadixButtonProps,
  Text,
} from '@radix-ui/themes';

interface ButtonProps extends Omit<RadixButtonProps, 'color'> {
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  loading,
  fullWidth = true,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <RadixButton
      highContrast
      disabled={loading || disabled}
      style={{
        border: '0px',
        marginTop: '20px',
        borderRadius: '5px',
        width: fullWidth ? '100%' : undefined,
        height: '40px',
        backgroundColor: loading || disabled ? '#9CA3AF' : '#3F53DD',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Text style={{ color: '#FFFFFF' }}>
        {loading ? "Processing..." : children}
      </Text>
    </RadixButton>
  );
};
