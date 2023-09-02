import { Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { Button, Form, FormInstance, Input, Modal, Select, Space, message } from 'antd';
import { Rule } from 'antd/es/form';
import FormItem from 'antd/es/form/FormItem';
import { FC, useState } from 'react';

import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

import CustomerApi from '../../../../api/customerApi';
import { ChangeAddressForm } from '../../../../types';
import { ValidationMessage, ValidationPattern } from '../../../../validationRules';

interface EditAddressModalProps {
  isEditAddressModalOpen: boolean;
  setIsEditAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<ChangeAddressForm>;
  customerInfo: Customer | undefined;
  editingAddressId: string;
  setEditingAddressId: React.Dispatch<React.SetStateAction<string>>;
}

const EditAddressModal: FC<EditAddressModalProps> = ({
  isEditAddressModalOpen,
  setIsEditAddressModalOpen,
  form,
  customerInfo,
  editingAddressId,
  setEditingAddressId,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setIsEditAddressModalOpen(false);
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

  const onFinish = (values: ChangeAddressForm) => {
    setLoading(true);

    const updateActions: CustomerUpdateAction[] = [
      { action: 'changeAddress', addressId: editingAddressId, address: values },
    ];

    const fetchUpdate = async () => {
      try {
        if (customerInfo?.id) {
          await CustomerApi.updateCustomer(customerInfo?.id, updateActions);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to update address. ${error.message}`);
        }
      } finally {
        setIsEditAddressModalOpen(false);
        setEditingAddressId('');
        setLoading(false);
      }
    };

    void fetchUpdate();
  };

  return (
    <Modal title="Edit Address" open={isEditAddressModalOpen} onCancel={handleCancel} footer={[]}>
      <Form
        form={form}
        name="editAddressForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item<ChangeAddressForm>
          label="First Name"
          name={'firstName'}
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

        <Form.Item<ChangeAddressForm>
          label="Last Name"
          name={'lastName'}
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

        <Form.Item<ChangeAddressForm>
          label="Address Line 1"
          name={'streetName'}
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

        <Form.Item<ChangeAddressForm>
          label="Address line 2"
          name={'additionalStreetInfo'}
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

        <Form.Item<ChangeAddressForm>
          label="Region"
          name={'region'}
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

        <Form.Item<ChangeAddressForm>
          label="City"
          name={'city'}
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

        <Form.Item<ChangeAddressForm>
          name={'country'}
          label="Country"
          rules={[{ required: true, message: 'Please select a country.' }]}
        >
          <Select placeholder="Select country" allowClear onChange={setSelectedCountry}>
            <Select.Option value="DE">Germany</Select.Option>
            <Select.Option value="US">United States</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<ChangeAddressForm>
          label="Postal code"
          name={'postalCode'}
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

        <Form.Item<ChangeAddressForm>
          label="Phone"
          name={'phone'}
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
        <FormItem>
          <Space>
            <Button key="submit" htmlType="submit" type="primary" loading={loading}>
              Submit
            </Button>
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditAddressModal;
