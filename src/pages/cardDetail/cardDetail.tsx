import { DollarTwoTone } from '@ant-design/icons';
import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { Image, Card, Layout, message, Spin } from 'antd';
// import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
const { Meta } = Card;
const { Content } = Layout;
import { useLocation, useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';
import { useAppSelector } from '../../app/hooks';

import styles from './cardDetail.module.css';

const CardDetail: FC = (): JSX.Element => {
  const BACK = -1;
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocationCardId = location.pathname.split('/').pop() as string;
  const card = useAppSelector((state) => state.currentProductCard) as ProductProjection;
  const [productCardList, setProductCardList] = useState<Product>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCardById(card.id ? card.id : currentLocationCardId);
        setProductCardList(res.body);
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

  return (
    <Content className={styles.container}>
      {confirmLoading ? (
        <div className={styles.center}>
          <Spin size="large" />
        </div>
      ) : (
        <Card
          title={productCardList?.masterData.current.name.en}
          style={{ width: '800', marginTop: '5%' }}
          extra={<a onClick={() => navigate(BACK)}>Back</a>}
          cover={
            <Image
              src={
                productCardList
                  ? productCardList.masterData.current.masterVariant.images
                    ? productCardList.masterData.current.masterVariant.images[0].url
                    : ''
                  : ''
              }
            />
          }
        >
          <Meta title="Europe Street beat" description="bla-bla-bla" />
          <Meta
            style={{ marginTop: 10 }}
            avatar={<DollarTwoTone style={{ fontSize: 20 }} />}
            description={
              productCardList
                ? productCardList.masterData.current.masterVariant.prices
                  ? productCardList.masterData.current.masterVariant.prices[0].value.centAmount
                  : ''
                : ''
            }
          />
        </Card>
      )}
    </Content>
  );
};

export default CardDetail;
