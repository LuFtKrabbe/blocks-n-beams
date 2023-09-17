import { Button, Form, Input, Space, message } from 'antd';
import { FC } from 'react';

import MyCartApi from '../../api/Cart';

import { getActiveCart } from '../../app/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { ValidationMessage, ValidationPattern } from '../../validationRules';

interface IpromoCodeFormValue {
  promoCode: string;
}

const PromoForm: FC = (): JSX.Element => {
  const [promoCodeForm] = Form.useForm<IpromoCodeFormValue>();
  const dispatch = useAppDispatch();

  const onFinishPromoForm = async (value: IpromoCodeFormValue) => {
    try {
      await MyCartApi.addDisountCode(value.promoCode);
      await dispatch(getActiveCart());
    } catch (error) {
      if (error instanceof Error) {
        await message.error(`Promo code apply failed. ${error.message}`);
      }
    }
  };

  return (
    <Space>
      <Form
        form={promoCodeForm}
        name="promoCodeForm"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 400, margin: '20px auto 10px auto' }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
        onFinish={(value) => {
          void onFinishPromoForm(value);
        }}
      >
        <Form.Item<IpromoCodeFormValue>
          label="Promo Code"
          name={'promoCode'}
          rules={[
            { required: false, whitespace: true },
            {
              pattern: new RegExp(ValidationPattern.Promo),
              message: ValidationMessage.Promo,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit" style={{ margin: '5px 10px' }}>
          Apply
        </Button>
      </Form>
    </Space>
  );
};

export default PromoForm;
