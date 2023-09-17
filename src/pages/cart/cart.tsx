import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Image, InputNumber, Result, Row, Space, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

import { removeItem, changeItemQuantity, deleteActiveCart, ICartState, getActiveCart } from '../../app/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import PromoForm from './PromoForm';
import styles from './cart.module.css';
import { convertPrice, getPriceElement, getTotalCartCostElement } from './utils';

const Cart: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector<ICartState>((state) => state.cart);

  useEffect(() => {
    setConfirmLoading(true);

    const fetchCart = async () => {
      await dispatch(getActiveCart()); // TODO: Test for error handling and double exec;
      setConfirmLoading(false);
    };

    const isAnonymous = CustomerApi.customerIsAnonymous();
    const isLoggedIn = CustomerApi.customerIsLoggedIn();

    if (isAnonymous || isLoggedIn) {
      void fetchCart();
    } else {
      setConfirmLoading(false);
    }
  }, []);

  const removeFromCart = async (lineItemId: string) => {
    await dispatch(removeItem({ lineItemId }));
  };

  const changeQuantity = async (lineItemId: string, quantity: number) => {
    await dispatch(changeItemQuantity({ lineItemId, quantity }));
  };

  const deleteCart = async () => {
    await dispatch(deleteActiveCart());
  };

  const items = cart?.lineItems.map((item) => {
    return (
      <div key={item.id}>
        <Row>
          <Col span={2} flex={'1 0 100px'}>
            <Image src={item.variant.images ? item.variant.images[0].url : ''} width={'100px'} />
          </Col>
          <Col span={8} flex={'1 2'}>
            {item.name['en-US']}
          </Col>
          <Col span={2}>{getPriceElement(item)}</Col>
          <Col span={4}>
            <InputNumber
              defaultValue={item.quantity}
              onChange={(value) => {
                if (value) {
                  void changeQuantity(item.id, value);
                }
              }}
            />
          </Col>
          <Col span={4}>{convertPrice(item.totalPrice)}</Col>
          <Col span={2}>
            <Button danger onClick={() => void removeFromCart(item.id)}>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    );
  });

  return confirmLoading ? (
    <div className={styles.center}>
      <Spin size="large" />
    </div>
  ) : cart?.totalLineItemQuantity ? (
    <>
      {items}
      <Divider></Divider>
      {getTotalCartCostElement(cart)}
      <Divider></Divider>
      <PromoForm />
      <Divider></Divider>
      <Space>
        <Button danger type="primary" onClick={() => void deleteCart()}>
          Clear Cart
        </Button>
      </Space>
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
