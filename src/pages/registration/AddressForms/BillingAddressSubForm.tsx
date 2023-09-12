import { Form, Input, Select, Space, Row, Col, Divider, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Rule } from 'antd/es/form';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

import { RegistrationFormType } from '../../../types';
import { ValidationMessage, ValidationPattern } from '../../../validationRules';

import styles from './BillingAdress.module.css';

type Props = {
  isDefaultBillingAddress?: boolean;
  setIsDefaultBillingAddress: Dispatch<SetStateAction<boolean>>;
};

const BillingAddressSubForm: FC<Props> = (props: Props): JSX.Element => {
  const spaceBetween = 'space-between';

  const { isDefaultBillingAddress, setIsDefaultBillingAddress } = props;

  const defaultAddressCheckboxOnChange = (e: CheckboxChangeEvent) => {
    setIsDefaultBillingAddress(e.target.checked);
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
    <Space direction="vertical" className={styles.registrationBilling}>
      <Row align={'middle'} justify={spaceBetween} wrap={false} className={styles.registrationBillingHeader}>
        <Col>
          <h2>Billing Address</h2>
        </Col>
        <Col>
          <Row align={'middle'} justify={spaceBetween} wrap={false}>
            <Col>
              <span className={styles.billingDefaultText}>Set as default</span>
            </Col>
            <Col>
              <Checkbox
                checked={isDefaultBillingAddress}
                onChange={defaultAddressCheckboxOnChange}
                className={styles.billingDefaultCheckbox}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider className={styles.devider} />

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="First Name"
            name={['billingAddress', 'firstName']}
            rules={[
              { required: true, whitespace: true, message: 'Please enter a first name.' },
              {
                pattern: new RegExp(ValidationPattern.FirstName),
                message: ValidationMessage.FirstName,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="Last Name"
            name={['billingAddress', 'lastName']}
            rules={[
              { required: true, whitespace: true, message: 'Please enter a last name.' },
              {
                pattern: new RegExp(ValidationPattern.LastName),
                message: ValidationMessage.LastName,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="Address Line 1"
            name={['billingAddress', 'streetName']}
            rules={[
              { required: true, whitespace: true, message: 'Please enter a billing address.' },
              {
                pattern: new RegExp(ValidationPattern.Address),
                message: ValidationMessage.Address,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="Address line 2"
            name={['billingAddress', 'additionalStreetInfo']}
            rules={[
              { whitespace: true },
              {
                pattern: new RegExp(ValidationPattern.Address),
                message: ValidationMessage.Address,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<RegistrationFormType>
        className={styles.registrationBillingInput}
        label="Region"
        name={['billingAddress', 'region']}
        rules={[
          { whitespace: true },
          {
            pattern: new RegExp(ValidationPattern.Region),
            message: ValidationMessage.Region,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="City"
            name={['billingAddress', 'city']}
            rules={[
              { required: true, whitespace: true, message: 'Please enter a city.' },
              {
                pattern: new RegExp(ValidationPattern.City),
                message: ValidationMessage.City,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            label="Phone"
            name={['billingAddress', 'phone']}
            rules={[
              { required: true, whitespace: true, message: 'Please enter a phone number.' },
              {
                pattern: new RegExp(ValidationPattern.Phone),
                message: ValidationMessage.Phone,
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
            name={['billingAddress', 'country']}
            label="Country"
            rules={[{ required: true, message: 'Please select a country.' }]}
          >
            <Select placeholder="Select country" allowClear onChange={setSelectedCountry}>
              <Select.Option value="DE">Germany</Select.Option>
              <Select.Option value="US">United States</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationBillingInputHalf}
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
        </Col>
      </Row>
    </Space>
  );
};

export default BillingAddressSubForm;
