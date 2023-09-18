import { DeleteOutlined, EuroOutlined } from '@ant-design/icons/lib/icons';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Image, Card, Button } from 'antd';
import { FC } from 'react';
const { Meta } = Card;
import { useLocation, useNavigate } from 'react-router-dom';

import { ICartState, addItem, removeItem } from '../../../app/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { userSlice } from '../../../app/reducers';

import styles from './productCard.module.css';

const ProductCard: FC<{ productCardList: ProductProjection }> = ({ productCardList }): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector<ICartState>((state) => state.cart);

  const location = useLocation();
  const currentLocationCardId = location.pathname.split('/').pop() as string;

  const productImage = productCardList.masterVariant.images?.[0].url;
  const productDescription = productCardList.metaDescription?.['en-US'];

  const productPrice = () => {
    const price = productCardList.masterVariant.prices?.[0].value;
    return price ? (price.centAmount / 100).toFixed(2) : 'No price';
  };
  const productPriceDiscount = () => {
    const priceDiscount = productCardList.masterVariant.prices?.[0].discounted?.value;
    priceDiscount;
    return priceDiscount ? (priceDiscount.centAmount / 100).toFixed(2) : 'No discount';
  };

  const onClick = () => {
    dispatch(userSlice.actions.setCurrentProductCard(productCardList));
    navigate(
      currentLocationCardId === 'main'
        ? `/main/${productCardList.id}`
        : `/main/${currentLocationCardId}/${productCardList.id}`,
    );
    // navigate(`/main/${currentLocationCardId}/${productCardList.id}`);
  };

  const addToCart = async (product: ProductProjection) => {
    await dispatch(addItem(product));
  };

  const removeFromCart = async (productId: string) => {
    const lineItemId = cart?.lineItems.find((item) => item.productId === productId)?.id;
    if (lineItemId) {
      await dispatch(removeItem({ lineItemId }));
    }
  };

  const isProductInCart = (product: ProductProjection) => {
    if (!cart) {
      return false;
    }
    return cart?.lineItems.some((item) => item.productId === product.id);
  };

  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <Card
        title={productCardList.name['en-US']}
        bordered
        hoverable
        className={styles.productCard}
        extra={<a onClick={onClick}>Details</a>}
        cover={<Image preview={false} className={styles.productImage} src={productImage ? productImage : 'No image'} />}
      >
        <Meta
          className={styles.description}
          description={productDescription ? productDescription : 'No description for this product'}
        />
        <Meta
          className={styles.pricesWrapper}
          avatar={<EuroOutlined className={styles.pricesIcon} />}
          description={
            <>
              <div className={styles.prices}>
                <span className={productPriceDiscount() === 'No discount' ? styles.price : styles.priceOff}>
                  {' '}
                  {productPrice()}{' '}
                </span>
                <span
                  className={productPriceDiscount() === 'No discount' ? styles.priceDiscountOff : styles.priceDiscount}
                >
                  {' '}
                  {productPriceDiscount()}{' '}
                </span>
              </div>
              <div className={styles.buttonsAddRemoveContainer}>
                {isProductInCart(productCardList) ? (
                  <>
                    <Button
                      disabled
                      type="primary"
                      className={styles.buttonAddToCart}
                      onClick={() => {
                        void addToCart(productCardList);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className={styles.buttonRemoveFromCart}
                      danger
                      onClick={() => {
                        void removeFromCart(productCardList.id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </>
                ) : (
                  <Button
                    className={styles.buttonAddToCart}
                    type="primary"
                    onClick={() => {
                      void addToCart(productCardList);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default ProductCard;
