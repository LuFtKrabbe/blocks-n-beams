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
          <Col span={4} className={styles.imageContainer}>
            <Image src={item.variant.images ? item.variant.images[0].url : ''} width={'100px'} />
          </Col>
          <Col className={styles.itemName} span={7}>
            {item.name['en-US']}
          </Col>
          <Col span={4} style={{ minWidth: '50px' }}>
            <div>
              <div className={styles.title}>Price:</div>
              {convertPrice(item.price.discounted ? item.price.discounted.value : item.price.value)}
            </div>
          </Col>
          <Col span={4} style={{ minWidth: '60px' }}>
            <div>
              <div className={styles.title}>Quantity:</div>
              <InputNumber
                defaultValue={item.quantity}
                className={styles.quantityInput}
                min={1}
                max={99}
                size="small"
                onChange={(value) => {
                  if (value) {
                    void changeQuantity(item.id, value);
                  }
                }}
              />
            </div>
          </Col>
          <Col span={4}>
            <div>
              <div className={styles.title}>Total Cost:</div>
              {convertPrice(item.totalPrice)}
            </div>
          </Col>
          <Col span={1}>
            <Button danger onClick={() => void removeFromCart(item.id)}>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
        <Divider></Divider>
      </div>
    );
  });

  return confirmLoading ? (
    <div className={styles.center}>
      <Spin size="large" />
    </div>
  ) : cart?.totalLineItemQuantity ? (
    <div className={styles.wrapper}>
      {items}
      <div className={styles.totalCost}>Total Cost: {convertPrice(cart.totalPrice)}</div>
      <Button danger type="primary" onClick={() => void deleteCart()}>
        Clear Cart
      </Button>
    </div>
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
