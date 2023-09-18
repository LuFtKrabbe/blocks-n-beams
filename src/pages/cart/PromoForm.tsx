import { Button, Form, Input, message } from 'antd';
import { FC } from 'react';

import MyCartApi from '../../api/Cart';

import { getActiveCart } from '../../app/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { ValidationMessage, ValidationPattern } from '../../validationRules';

import styles from './PromoForm.module.css';

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
    <div className={styles.promoFormContainer}>
      <Form
        form={promoCodeForm}
        name="promoCodeForm"
        layout="horizontal"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        className={styles.promoForm}
        autoComplete="off"
        onFinish={(value) => {
          void onFinishPromoForm(value);
        }}
      >
        <Form.Item<IpromoCodeFormValue>
          label="Promo Code"
          name={'promoCode'}
          className={styles.promoFormItemInput}
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
        <Button className={styles.promoFormApplyButton} key="submit" type="primary" htmlType="submit">
          Apply
        </Button>
      </Form>
    </div>
  );
};

export default PromoForm;
