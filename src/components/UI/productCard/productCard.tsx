import { EuroOutlined } from '@ant-design/icons/lib/icons';
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

  const productImage = productCardList.masterVariant.images?.[0].url;
  const productDescription = productCardList.metaDescription?.['en-US'];
  const productPrice = () => {
    const price = productCardList.masterVariant.prices?.[0].value;
    return price ? (price.centAmount / 100).toFixed(2) : 'No price';
  }
  const productPriceDiscount = () => {
    const priceDiscount = productCardList.masterVariant.prices?.[0].discounted?.value;
    return priceDiscount ? (priceDiscount.centAmount / 100).toFixed(2) : 'No discount';
  }

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
      cover={<Image src={productImage ? productImage : 'No image'} />}
    >
      <Meta description={productDescription ? productDescription : 'No description for this product'} />
      <Meta
        style={{ marginTop: 10 }}
        avatar={<EuroOutlined style={{ fontSize: 20 }} />}
        description={
          <>
            <span> {productPrice()} </span>
            <span> {productPriceDiscount()} </span>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;
