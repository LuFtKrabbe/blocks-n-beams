import { Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { Button, DatePicker, Form, FormInstance, Input, Modal, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import CustomerApi from '../../../api/customerApi';
import { RegistrationFormType } from '../../../types';

import { ValidationMessage, ValidationPattern, ValidationAge } from '../../../validationRules';

export interface EditCustomerModalProps {
  isModalOpen: boolean;
  form: FormInstance<RegistrationFormType>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerInfo: Customer | undefined;
}

const EditCustomerModal: FC<EditCustomerModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  form,
  customerInfo,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    const values = form.getFieldsValue();
    setLoading(true);

    const updateActions: CustomerUpdateAction[] = [
      { action: 'setFirstName', firstName: values.firstName },
      { action: 'setLastName', lastName: values.lastName },
      { action: 'setDateOfBirth', dateOfBirth: dayjs(values.birthday).format('YYYY-MM-DD') },
    ];

    const fetchUpdate = async () => {
      try {
        if (customerInfo?.id) {
          await CustomerApi.updateCustomer(customerInfo?.id, updateActions);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to update customer info. ${error.message}`);
        }
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    };

    void fetchUpdate();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Edit Profile"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="editCustomerForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
      >
        <Form.Item<RegistrationFormType>
          label="First Name"
          name="firstName"
          rules={[
            { required: true, whitespace: true, message: 'Please enter your first name.' },
            {
              pattern: new RegExp(ValidationPattern.FirstName),
              message: ValidationMessage.FirstName,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<RegistrationFormType>
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, whitespace: true, message: 'Please enter your last name.' },
            {
              pattern: new RegExp(ValidationPattern.LastName),
              message: ValidationMessage.LastName,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<RegistrationFormType>
          label="Birthday"
          name="birthday"
          rules={[
            {
              required: true,
              whitespace: true,
              validator: (_, value: Dayjs) => {
                const now = dayjs(Date.now());
                const age = now.diff(value, 'year');
                if (value) {
                  return age >= ValidationAge.MIN && age <= ValidationAge.MAX
                    ? Promise.resolve()
                    : Promise.reject(
                        `Please enter a valid date. Your age should be from ${ValidationAge.MIN} to ${ValidationAge.MAX}.`,
                      );
                } else {
                  return Promise.reject('Please enter your date of birth');
                }
              },
            },
          ]}
          hasFeedback
        >
          <DatePicker name="birthday-item" />
        </Form.Item>

        <Form.Item<RegistrationFormType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              validator: (_, value: string) => {
                if (value) {
                  return isEmail(value) ? Promise.resolve() : Promise.reject('Please enter valid email.');
                } else {
                  return Promise.reject('Please input your email.');
                }
              },
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCustomerModal;
