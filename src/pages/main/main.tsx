import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, Spin, message, theme } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsSearching } from '../../app/productsListSlice';
import ProductCard from '../../components/UI/productCard/productCard';

import items from '../categories/shared';

import styles from './main.module.css';

const { Content, Footer, Sider } = Layout;

const Main: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const [viewCardsList, setViewCardsList] = useState<JSX.Element[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);
  const { isSearching, productsSearchList } = useAppSelector((state) => state.productsSearch);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCategoriesById(ProductApi.MAIN_LINK_ID);
        setProductList(res.body.results);

        isSearching
          ? setViewCardsList(productsSearchList?.map((elem) => <ProductCard key={elem.id} productCardList={elem} />))
          : setViewCardsList(res.body.results?.map((elem) => <ProductCard key={elem.id} productCardList={elem} />));
        dispatch(setIsSearching(false));
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
      }
    };
    void fetchData();
  }, [productsSearchList]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Content style={{ margin: '16px 0' }}>
          <a onClick={() => navigate('/main')}> Main</a>
        </Content>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu mode="inline" style={{ height: '100%' }} items={items} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <div className={styles.container}>
              {confirmLoading ? (
                <div className={styles.center}>
                  <Spin size="large" />
                </div>
              ) : (
                viewCardsList
              )}
            </div>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

export default Main;
