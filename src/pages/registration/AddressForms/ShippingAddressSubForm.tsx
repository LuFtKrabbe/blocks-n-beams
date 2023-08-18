import { Checkbox, Form, Input, Select, Space, Switch } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Rule } from 'antd/es/form';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

type Props = {
  isDefaultShippingAddress?: boolean;
  setIsDefaultShippingAddress: Dispatch<SetStateAction<boolean>>;
  shippingAsBilling: boolean;
  setShippingAsBilling: Dispatch<SetStateAction<boolean>>;
};

const ShippingAddressSubForm: FC<Props> = (props: Props): JSX.Element => {
  const { shippingAsBilling, setShippingAsBilling, setIsDefaultShippingAddress } = props;

  const [selectedCountry, setSelectedCountry] = useState<PostalCodeLocale | 'any'>('any');

  const shippingAddressSwitchOnChange = (checked: boolean) => {
    setShippingAsBilling(checked);
  };

  const defaultAddressCheckboxOnChange = (event: CheckboxChangeEvent) => {
    setIsDefaultShippingAddress(event.target.checked);
  };

  const validator = (_: Rule, value: string | undefined) => {
    if (shippingAsBilling) {
      return Promise.resolve();
    }

    if (value) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  const validatePostalCode = (_: Rule, value: string | undefined) => {
    if (shippingAsBilling) {
      return Promise.resolve();
    }

    if (value && isPostalCode(value, selectedCountry)) {
      return Promise.resolve();
    } else {
      if (value) {
        return Promise.reject('Please enter a valid postal code.');
      } else {
        return Promise.reject('Please enter a postal code.');
      }
    }
  };

  return (
    <Space direction="vertical">
      <h2>Shipping Address:</h2>

      <Checkbox onChange={defaultAddressCheckboxOnChange}>Set as default shipping address</Checkbox>

      <Space>
        <Switch onChange={shippingAddressSwitchOnChange} />
        <span>Use the same address as for billing</span>
      </Space>

      <Form.Item<RegistrationFormType>
        label="First Name"
        name={['shippingAddress', 'firstName']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator,
            message: 'Please enter a first name.',
          },
          {
            pattern: /^[ A-Za-z]{1,16}$/,
            message: 'Please enter a valid first name.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Last Name"
        name={['shippingAddress', 'lastName']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator,
            message: 'Please enter a last name.',
          },
          {
            pattern: /^[ A-Za-z]{1,16}$/,
            message: 'Please enter a valid last name.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Address Line 1"
        name={['shippingAddress', 'streetName']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator,
            message: 'Please enter a shipping address.',
          },
          {
            pattern: /^[\d A-Za-z-]{1,32}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Address line 2"
        name={['shippingAddress', 'additionalStreetInfo']}
        rules={[
          { whitespace: true },
          {
            pattern: /^[\d A-Za-z-]{1,32}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Region"
        name={['shippingAddress', 'region']}
        rules={[
          { whitespace: true },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid region.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="City"
        name={['shippingAddress', 'city']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator,
            message: 'Please enter a city.',
          },
          {
            pattern: /^[ A-Za-z-]{1,32}$/,
            message: 'Please enter a valid city.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        name={['shippingAddress', 'country']}
        label="Country"
        rules={[{ required: true, message: 'Please select a country.', validator }]}
      >
        <Select placeholder="Select country" allowClear onChange={setSelectedCountry}>
          <Select.Option value="DE">Germany</Select.Option>
          <Select.Option value="US">United States</Select.Option>
          <Select.Option value="AU">Australia</Select.Option>
          <Select.Option value="ES">Spain</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Postal code"
        name={['shippingAddress', 'postalCode']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator: validatePostalCode,
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Phone"
        name={['shippingAddress', 'phone']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator,
            message: 'Please enter your phone number.',
          },
          {
            pattern: /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/,
            message: 'Please enter a valid phone number.',
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>
    </Space>
  );
};

export default ShippingAddressSubForm;
