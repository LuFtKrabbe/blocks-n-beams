import { DollarTwoTone } from '@ant-design/icons/lib/icons';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Image, Card } from 'antd';
// import classNames from 'classnames';
import { FC } from 'react';
const { Meta } = Card;
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { userSlice } from '../../../app/reducers';

const ProductCard: FC<{ productCardList: ProductProjection }> = ({ productCardList }): JSX.Element => {
  const navigate = useNavigate();
  // const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const currentLocationCardId = location.pathname.split('/').pop() as string;

  const onClick = () => {
    dispatch(userSlice.actions.setCurrentProductCard(productCardList));
    navigate(
      currentLocationCardId === 'main'
        ? `/main/${productCardList.id}`
        : `/main/${currentLocationCardId}/${productCardList.id}`,
    );
    // navigate(`/main/${currentLocationCardId}/${productCardList.id}`);
  };
  return (
    <Card
      title={productCardList.name['en-US']}
      hoverable
      style={{ width: 300, marginTop: 10 }}
      extra={<a onClick={onClick}>View details</a>}
      cover={<Image src={productCardList.masterVariant?.images ? productCardList.masterVariant?.images[0].url : ''} />}
    >
      <Meta title="Europe Street beat" description="bla-bla-bla" />
      <Meta
        style={{ marginTop: 10 }}
        avatar={<DollarTwoTone style={{ fontSize: 20 }} />}
        description={
          productCardList.masterVariant.prices ? productCardList.masterVariant.prices[0].value.centAmount : ''
        }
      />
    </Card>
  );
};

export default ProductCard;
