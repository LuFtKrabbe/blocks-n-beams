import { Customer } from '@commercetools/platform-sdk';
import { Button, Form, FormInstance, Input, Modal, message } from 'antd';
import { FC, useState } from 'react';

import CustomerApi from '../../../api/customerApi';
import { ChangePasswordForm } from '../../../types';
import { ValidationMessage, ValidationPattern } from '../../../validationRules';

export interface ChangePasswordModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<ChangePasswordForm>;
  customerInfo: Customer | undefined;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  form,
  customerInfo,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = () => {
    const values = form.getFieldsValue();

    setLoading(true);

    const fetchUpdate = async () => {
      try {
        if (customerInfo?.id) {
          await CustomerApi.changePassword(customerInfo.id, values.currentPassword, values.newPassword);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to change password. ${error.message}`);
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
      title="Change Password"
      open={isModalOpen}
      onCancel={handleCancel}
      bodyStyle={{textAlign: 'center'}}
      footer={false}
    >
      <Form
        name="changePasswordForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400, margin: '20px auto 10px auto' }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item<ChangePasswordForm>
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: 'Please input your current password.' },
            {
              pattern: new RegExp(ValidationPattern.Password),
              message: ValidationMessage.Password,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<ChangePasswordForm>
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password.' },
            {
              pattern: new RegExp(ValidationPattern.Password),
              message: ValidationMessage.Password,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match.'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit" loading={loading} style={{ margin: '5px 10px' }}>
          Submit
        </Button>
        <Button key="cancel" onClick={handleCancel} style={{ margin: '5px 10px' }}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
