import { RollbackOutlined, EuroOutlined } from '@ant-design/icons';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Button, Carousel, Image, Layout, message, Spin } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import classNames from 'classnames';
import { FC, useState, useRef, RefObject, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';
import { useAppSelector } from '../../app/hooks';

import styles from './cardDetail.module.css';

const { Content } = Layout;

const CardDetail: FC = (): JSX.Element => {
  const BACK = -1;
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocationCardId = location.pathname.split('/').pop() as string;
  const card = useAppSelector((state) => state.currentProductCard) as ProductProjection;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);

  const carouselRef = useRef() as RefObject<CarouselRef>;

  const [currentProductImage, setCurrentProductImage] = useState<number>(0);
  const [productName, setproductName] = useState<string>('loading...');
  const [productDescription, setproductDescription] = useState<string>('No description for this product');
  const [productImages, setproductImages] = useState<string[]>(['string']);
  const [productPrice, setProductPrice] = useState<string>('');
  const [productPriceDiscount, setProductPriceDiscount] = useState<string>('');
  const [isPriceDiscount, setIsPriceDiscount] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getProduct = await ProductApi.getCardById(card.id ? card.id : currentLocationCardId);
        const productName = getProduct.body.masterData.current.name['en-US'];
        const productDescription = getProduct.body.masterData.current.metaDescription?.['en-US'];
        const productImages = getProduct.body.masterData.current.masterVariant.images;
        const productPrice = getProduct.body.masterData.current.masterVariant.prices?.[0].value;
        const productPriceDiscount = getProduct.body.masterData.current.masterVariant.prices?.[0].discounted?.value;

        setproductName(productName);

        if (productDescription) {
          setproductDescription(productDescription);
        }
        if (productImages) {
          setproductImages(productImages.map((value) => value.url));
        }
        if (productPrice) {
          setProductPrice((productPrice.centAmount / 100).toFixed(2) + ' ' + productPrice.currencyCode);
        }
        if (productPriceDiscount) {
          setIsPriceDiscount(true);
          setProductPriceDiscount(
            (productPriceDiscount.centAmount / 100).toFixed(2) + ' ' + productPriceDiscount.currencyCode,
          );
        }
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

  const setCurrentSlide = (currentSlide: number) => {
    setCurrentProductImage(currentSlide);
  };

  const setCurrentCarouselSlide = (current: number, prevCurrent: number) => {
    setCurrentProductImage(current);
    carouselRef.current?.goTo(current);
  };

  return (
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
              <p className={styles.description}>{productDescription}</p>
            </div>

            <div className={styles.cardButtonContent}>
              <Button
                className={styles.buttonBusket}
                type="primary"
                onClick={() => {
                  navigate('/cart');
                }}
              >
                <EuroOutlined />
                Add to busket
              </Button>
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
  );
};

export default CardDetail;
