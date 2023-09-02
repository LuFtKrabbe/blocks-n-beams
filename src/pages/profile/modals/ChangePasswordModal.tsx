import { Button, Form, Input, Modal } from 'antd';
import { FC, useState } from 'react';

type FieldType = {
  currentPassword: string;
  newPassword: string;
};

export interface ChangePasswordModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ isModalOpen, setIsModalOpen }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const timeout = 1000; // TODO: API CALL
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, timeout);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value: FieldType) => {
    console.log(value);
  };

  return (
    <Modal
      title="Change Password"
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
        name="changePasswordForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: 'Please input your current password.' },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,25}$/,
              message:
                'Please enter a valid password. 8 characters minimum. Must include uppercase/lowercase letters and numbers.',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password.' },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,25}$/,
              message:
                'Please enter a valid password. 8 characters minimum. Must include uppercase/lowercase letters and numbers.',
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
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered does not match.'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
