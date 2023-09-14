import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart as CartType, CentPrecisionMoney, TypedMoney } from '@commercetools/platform-sdk';
import { Button, Image, InputNumber, List, Result, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MyCartApi from '../../api/Cart';

import CustomerApi from '../../api/customerApi';

import styles from './cart.module.css';

// eslint-disable-next-line sonarjs/cognitive-complexity
const Cart: FC = (): JSX.Element => {
  const [cart, setCart] = useState<CartType>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await MyCartApi.getActiveCart();
        setCart(response.body);
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
      }
    };

    const isAnonymous = CustomerApi.customerIsAnonymous();
    const isLoggedIn = CustomerApi.customerIsLoggedIn();

    if (isAnonymous || isLoggedIn) {
      void fetchCart();
    } else {
      setConfirmLoading(false);
    }
  }, []);

  const convertPrice = (price: TypedMoney | CentPrecisionMoney) => {
    return (price.centAmount / 100).toFixed(price.fractionDigits) + ' ' + price.currencyCode;
  };

  return confirmLoading ? (
    <div className={styles.center}>
      <Spin size="large" />
    </div>
  ) : cart ? (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cart?.lineItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Image src={item.variant.images ? item.variant.images[0].url : ''} width={'100px'} />}
              title={item.name['en-US']}
            />
            Price: {convertPrice(item.price.discounted ? item.price.discounted.value : item.price.value)}
            Count: <InputNumber value={item.quantity} />
            Total Cost: {convertPrice(item.totalPrice)}
            <Button danger>Remove Item</Button>
          </List.Item>
        )}
      />
      <Button danger type="primary">
        Clear Cart
      </Button>
    </>
  ) : (
    <Result
      icon={<ShoppingCartOutlined />}
      title="Cart is empty!"
      extra={
        <Button type="primary" onClick={() => navigate('/main')}>
          Catalog
        </Button>
      }
    />
  );
};

export default Cart;
