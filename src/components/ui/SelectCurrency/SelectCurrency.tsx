import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons'; // Fallback icon
import './SelectCurrency.css';

type Option = {
  label: string;
  value: string;
};

interface SelectCurrencyProps {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  placeholder?: string;
  CustomIcon?: React.ReactNode;
}

export const SelectCurrency = ({
  value,
  onChange,
  options = [
    { label: 'Bitcoin', value: 'BTC' },
    { label: 'Ethereum', value: 'ETH' },
    { label: 'Litecoin', value: 'LTC' },
  ],
  placeholder = 'Select Currency',
  CustomIcon,
}: SelectCurrencyProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="SelectTrigger">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          {CustomIcon ?? <ChevronDownIcon />}
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent" position="popper">
          <Select.Viewport className="SelectViewport">
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className="SelectItem">
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
