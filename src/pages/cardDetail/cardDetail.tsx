import { RollbackOutlined, EuroOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProductData, ProductProjection } from '@commercetools/platform-sdk';
import { Button, Carousel, Image, Layout, message, Spin } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import classNames from 'classnames';
import { FC, useState, useRef, RefObject, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';
import { ICartState, addItem, removeItem } from '../../app/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import styles from './cardDetail.module.css';

const { Content } = Layout;

const CardDetail: FC = (): JSX.Element => {
  const BACK = -1;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentLocationCardId = location.pathname.split('/').pop() as string;
  const card = useAppSelector((state) => state.user.currentProductCard) as ProductProjection;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);
  const { cart } = useAppSelector<ICartState>((state) => state.cart);

  const carouselRef = useRef() as RefObject<CarouselRef>;

  const [currentProductImage, setCurrentProductImage] = useState<number>(0);
  const [productName, setProductName] = useState<string>('loading...');
  const [productUnit, setProductUnit] = useState<string>('unit');
  const [productColor, setProductColor] = useState<string>('no color');
  const [productMark, setProductMark] = useState<string>('no mark');
  const [productDimensions, setProductDimensions] = useState<string>('no dimensions');
  const [productDescription, setProductDescription] = useState<string>('No description for this product');
  const [productImages, setProductImages] = useState<string[]>(['string']);
  const [productPrice, setProductPrice] = useState<string>('');
  const [productPriceDiscount, setProductPriceDiscount] = useState<string>('');
  const [isPriceDiscount, setIsPriceDiscount] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getProduct = await ProductApi.getCardById(card.id ? card.id : currentLocationCardId);
        const currentProductData = getProduct.body.masterData.current;
        setProductProperties(currentProductData);
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed. ${error.message}`);
          navigate('/error');
        }
      } finally {
        setConfirmLoading(false);
      }
    };

    void fetchData();
  }, []);

  function setProductProperties(data: ProductData) {
    const productName = data.name['en-US'];
    const productDescription = data.description?.['en-US'];
    const productImages = data.masterVariant.images;
    const productPrice = data.masterVariant.prices?.[0].value;
    const productPriceDiscount = data.masterVariant.prices?.[0].discounted?.value;
    const productAttributes = data.masterVariant.attributes;

    if (productName && productImages && productPrice) {
      setProductName(productName);
      setProductImages(productImages.map((value) => value.url));
      setProductPrice((productPrice.centAmount / 100).toFixed(2) + ' ' + productPrice.currencyCode);
    }

    if (productDescription) {
      setProductDescription(productDescription);
    }

    if (productPriceDiscount) {
      setIsPriceDiscount(true);
      setProductPriceDiscount(
        (productPriceDiscount.centAmount / 100).toFixed(2) + ' ' + productPriceDiscount.currencyCode,
      );
    }

    if (productAttributes) {
      for (const attr of productAttributes) {
        switch (attr.name.slice(0, attr.name.indexOf('-'))) {
          case 'unit':
            setProductUnit(attr.value as string);
            break;
          case 'color':
            setProductColor(attr.value as string);
            break;
          case 'mark':
            setProductMark(attr.value as string);
            break;
          case 'dimensions':
            setProductDimensions(attr.value as string);
            break;
        }
      }
    }
  }

  const setCurrentSlide = (currentSlide: number) => {
    setCurrentProductImage(currentSlide);
  };

  const setCurrentCarouselSlide = (current: number) => {
    setCurrentProductImage(current);
    carouselRef.current?.goTo(current);
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
    <Content className={styles.layoutWrapper}>
      <Content className={styles.cardWrapper}>
        {confirmLoading ? (
          <div className={styles.center}>
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.cardContent}>
            <div className={styles.cardImageContent}>
              <div className={styles.carouselWrapper}>
                <Carousel afterChange={setCurrentSlide} className={styles.carousel} ref={carouselRef}>
                  {productImages.map((value, index) => (
                    <Image.PreviewGroup
                      preview={{ current: currentProductImage, onChange: setCurrentCarouselSlide }}
                      items={productImages}
                      key={index}
                    >
                      <Image src={value} preview={{ mask: <> </> }} className={classNames(styles.carousel)} />
                    </Image.PreviewGroup>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className={classNames(styles.cardTextButtonContent)}>
              <div className={styles.cardTextContent}>
                <p className={styles.title}>{productName}</p>
                <div className={styles.prices}>
                  <p className={isPriceDiscount ? styles.priceOff : styles.price}> {productPrice} </p>
                  <p className={isPriceDiscount ? styles.priceDiscount : styles.priceDiscountOff}>
                    {productPriceDiscount}
                  </p>
                </div>
                <p className={styles.unit}> price per 1 {productUnit} </p>
                <p className={styles.description}>{productDescription}</p>
                <p className={styles.color}>
                  Color:&nbsp;<span>{productColor}</span>
                </p>
                <p className={styles.mark}>
                  Mark:&nbsp;<span>{productMark}</span>
                </p>
                <p className={styles.dimensions}>
                  Dimensions:&nbsp;<span>{productDimensions}</span>
                </p>
              </div>

              <div className={styles.cardButtonContent}>
                {isProductInCart(card) ? (
                  <div>
                    <Button
                      className={styles.buttonBusket}
                      disabled
                      type="primary"
                      onClick={() => {
                        void addToCart(card);
                      }}
                    >
                      <EuroOutlined />
                      Add to Cart
                    </Button>
                    <Button
                      danger
                      onClick={() => {
                        void removeFromCart(card.id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className={styles.buttonBusket}
                    type="primary"
                    onClick={() => {
                      void addToCart(card);
                    }}
                  >
                    <EuroOutlined />
                    Add to Cart
                  </Button>
                )}
                <Button
                  className={styles.buttonCatalog}
                  type="primary"
                  onClick={() => {
                    navigate(BACK);
                  }}
                >
                  <RollbackOutlined />
                  Catalog
                </Button>
              </div>
            </div>
          </div>
        )}
      </Content>
    </Content>
  );
};

export default CardDetail;
