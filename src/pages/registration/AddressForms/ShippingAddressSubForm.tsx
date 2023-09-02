import { Form, Input, Select, Space, Switch, Row, Col, Divider, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Rule } from 'antd/es/form';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

import { RegistrationFormType } from '../../../types';
import { ValidationMessage, ValidationPattern } from '../../../validationRules';

import styles from './ShippingAddress.module.css';

type Props = {
  isDefaultShippingAddress?: boolean;
  setIsDefaultShippingAddress: Dispatch<SetStateAction<boolean>>;
  shippingAsBilling: boolean;
  setShippingAsBilling: Dispatch<SetStateAction<boolean>>;
};

const ShippingAddressSubForm: FC<Props> = (props: Props): JSX.Element => {
  const spaceBetween = 'space-between';

  const { shippingAsBilling, setShippingAsBilling, setIsDefaultShippingAddress } = props;

  const [selectedCountry, setSelectedCountry] = useState<PostalCodeLocale | 'any'>('any');
  const [openedShippingForm, setOpenedShippingForm] = useState<boolean>(false);

  const shippingAddressSwitchOnChange = (checked: boolean) => {
    setShippingAsBilling(checked);
    setOpenedShippingForm(checked ? true : false);
  };

  const defaultAddressCheckboxOnChange = (e: CheckboxChangeEvent) => {
    setIsDefaultShippingAddress(e.target.checked);
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
    <Space
      direction="vertical"
      className={openedShippingForm ? styles.registrationShippingClose : styles.registrationShipping}
    >
      <Row align={'middle'} justify={spaceBetween} wrap={false} className={styles.registrationShippingHeader}>
        <Col>
          <h2>Shipping Address</h2>
        </Col>
        <Col>
          <Row align={'middle'} justify={spaceBetween} wrap={false}>
            <Col>
              <span className={styles.shippingDefaultText}>Set as default</span>
            </Col>
            <Col>
              <Checkbox onChange={defaultAddressCheckboxOnChange} className={styles.shippingDefaultCheckbox} />
            </Col>
          </Row>
          <Row align={'middle'} justify={spaceBetween} wrap={false}>
            <Col>
              <span className={styles.shippingDefaultText}>Same as billing</span>
            </Col>
            <Col>
              <Switch onChange={shippingAddressSwitchOnChange} size={'small'} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider className={styles.devider} />

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
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
                pattern: new RegExp(ValidationPattern.FirstName),
                message: ValidationMessage.FirstName,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
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
                pattern: new RegExp(ValidationPattern.LastName),
                message: ValidationMessage.LastName,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>
      </Row>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
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
                pattern: new RegExp(ValidationPattern.Address),
                message: ValidationMessage.Address,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
            label="Address line 2"
            name={['shippingAddress', 'additionalStreetInfo']}
            rules={[
              { whitespace: true },
              {
                pattern: new RegExp(ValidationPattern.Address),
                message: ValidationMessage.Address,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<RegistrationFormType>
        className={styles.registrationShippingInput}
        label="Region"
        name={['shippingAddress', 'region']}
        rules={[
          { whitespace: true },
          {
            pattern: new RegExp(ValidationPattern.Region),
            message: ValidationMessage.Region,
          },
        ]}
        hasFeedback
      >
        <Input disabled={shippingAsBilling} />
      </Form.Item>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
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
                pattern: new RegExp(ValidationPattern.City),
                message: ValidationMessage.City,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
            label="Phone"
            name={['shippingAddress', 'phone']}
            rules={[
              {
                required: true,
                whitespace: true,
                validator,
                message: 'Please enter a phone number.',
              },
              {
                pattern: new RegExp(ValidationPattern.Phone),
                message: ValidationMessage.Phone,
              },
            ]}
            hasFeedback
          >
            <Input disabled={shippingAsBilling} />
          </Form.Item>
        </Col>
      </Row>

      <Row align={'top'} justify={spaceBetween} wrap={false}>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
            name={['shippingAddress', 'country']}
            label="Country"
            rules={[{ required: true, message: 'Please select a country.', validator }]}
          >
            <Select placeholder="Select country" allowClear onChange={setSelectedCountry}>
              <Select.Option value="DE">Germany</Select.Option>
              <Select.Option value="US">United States</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<RegistrationFormType>
            className={styles.registrationShippingInputHalf}
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
        </Col>
      </Row>
    </Space>
  );
};

export default ShippingAddressSubForm;
