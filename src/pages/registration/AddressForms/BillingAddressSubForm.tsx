import { Form, Input, Select, Space, Switch } from 'antd';
import { Rule } from 'antd/es/form';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

import { RegistrationFormType } from '../../../types';

type Props = {
  isDefaultBillingAddress?: boolean;
  setIsDefaultBillingAddress: Dispatch<SetStateAction<boolean>>;
};

const BillingAddressSubForm: FC<Props> = (props: Props): JSX.Element => {
  const { setIsDefaultBillingAddress } = props;

  const defaultAddressCheckboxOnChange = (checked: boolean) => {
    setIsDefaultBillingAddress(checked);
  };

  const [selectedCountry, setSelectedCountry] = useState<PostalCodeLocale | 'any'>('any');

  const validatePostalCode = (_: Rule, value: string | undefined) => {
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
      <h2>Billing Address:</h2>

      <Space>
        <Switch onChange={defaultAddressCheckboxOnChange} />
        <span>Set as default billing address</span>
      </Space>

      <Form.Item<RegistrationFormType>
        label="First Name"
        name={['billingAddress', 'firstName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter your first name.' },
          {
            pattern: /^[ A-Za-z]{1,16}$/,
            message: 'Please enter a valid first name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Last Name"
        name={['billingAddress', 'lastName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter your last name.' },
          {
            pattern: /^[ A-Za-z]{1,16}$/,
            message: 'Please enter a valid last name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Address Line 1"
        name={['billingAddress', 'streetName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter billing address.' },
          {
            pattern: /^[\d A-Za-z-]{1,32}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Address line 2"
        name={['billingAddress', 'additionalStreetInfo']}
        rules={[
          { whitespace: true },
          {
            pattern: /^[\d A-Za-z-]{1,32}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Region"
        name={['billingAddress', 'region']}
        rules={[
          { whitespace: true },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid region.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="City"
        name={['billingAddress', 'city']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter city name.' },
          {
            pattern: /^[ A-Za-z-]{1,32}$/,
            message: 'Please enter a valid city.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        name={['billingAddress', 'country']}
        label="Country"
        rules={[{ required: true, message: 'Please select a country.' }]}
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
        name={['billingAddress', 'postalCode']}
        rules={[
          {
            required: true,
            whitespace: true,
            validator: validatePostalCode,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Phone"
        name={['billingAddress', 'phone']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter your phone number.' },
          {
            pattern: /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/,
            message: 'Please enter a valid phone number.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
    </Space>
  );
};

export default BillingAddressSubForm;
