import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { CentPrecisionMoney, TypedMoney } from '@commercetools/platform-sdk';
import { Button, Col, Divider, Image, InputNumber, Result, Row, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

import { removeItem, changeItemQuantity, deleteActiveCart, ICartState, getActiveCart } from '../../app/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import styles from './cart.module.css';

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

  const convertPrice = (price: TypedMoney | CentPrecisionMoney) => {
    return (price.centAmount / 100).toFixed(price.fractionDigits) + ' ' + price.currencyCode;
  };

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
          <Col span={2}>{convertPrice(item.price.discounted ? item.price.discounted.value : item.price.value)}</Col>
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
      {/* <List
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
      /> */}
      <Divider></Divider>
      <div>Total Cost: {convertPrice(cart.totalPrice)}</div>
      <Button danger type="primary" onClick={() => void deleteCart()}>
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
