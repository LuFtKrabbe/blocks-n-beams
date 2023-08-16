import { Checkbox, Form, Input, Select, Space, Switch } from 'antd';
import { FC } from 'react';

import { RegistrationFormType } from '../registration';

const ShippingAddressForm: FC = (): JSX.Element => {
  return (
    <Space direction="vertical">
      <h2>Shipping Address:</h2>
      <Checkbox>Set as default shipping address</Checkbox>
      <Space>
        <Switch /> <span>Use the same address as for billing</span>
      </Space>
      <Form.Item<RegistrationFormType>
        label="First Name"
        name={['shippingAddress', 'firstName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter your first name.' },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid first name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        label="Last Name"
        name={['shippingAddress', 'lastName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter your last name.' },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid last name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        label="Address Line 1"
        name={['shippingAddress', 'streetName']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter billing address.' },
          {
            pattern: /^[\d A-Za-z]{2,12}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        label="Address line 2"
        name={['shippingAddress', 'additionalStreetInfo']}
        rules={[
          { required: false, whitespace: true },
          {
            pattern: /^[\d A-Za-z]{2,12}$/,
            message: 'Please enter a valid address.',
          },
        ]}
        hasFeedback
      >
        <Input />
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
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        label="City"
        name={['shippingAddress', 'city']}
        rules={[
          { required: true, whitespace: true, message: 'Please enter city name.' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter a valid city.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        name={['shippingAddress', 'country']}
        label="Country"
        rules={[{ required: true, message: 'Please select a country.' }]}
      >
        <Select placeholder="Select country" allowClear>
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
          { required: true, whitespace: true, message: 'Please enter postal code.' },
          {
            pattern: /^\d{4,6}$/, // TODO: validator isPostalCode(str, locale)
            message: 'Please enter a valid postal code.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<RegistrationFormType>
        label="Phone"
        name={['shippingAddress', 'phone']}
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

export default ShippingAddressForm;
