import { Checkbox, Form, Input, Select, Space } from 'antd';
import { FC } from 'react';

import { RegistrationFormType } from '../registration';

const BillingAddressForm: FC = (): JSX.Element => {
  return (
    <Space direction="vertical">
      <h2>Billing Address:</h2>
      <Checkbox>Set as default billing address</Checkbox>
      <Form.Item<RegistrationFormType>
        label="First Name"
        name="billingFirstName"
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
        name="billingLastName"
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
        name="billingStreetName"
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
        name="billingAdditionalStreetInfo"
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
        name="billingRegion"
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
        name="billingCity"
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
        name="billingCountry"
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
        name="billingPostalCode"
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
        name="billingPhone"
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

export default BillingAddressForm;
