/* eslint-disable @typescript-eslint/naming-convention */
import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, MenuProps, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';

import { useAppSelector } from '../../app/hooks';
// import { setQueryArgs } from '../../app/productsListSlice';
import ProductCard from '../../components/UI/productCard/productCard';

import { NUMBER_LIMIT, items, rootSubmenuKeys } from '../categories/shared';

import styles from './main.module.css';

const { Content, Footer, Sider } = Layout;

const Main: FC = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  const [openKeys, setOpenKeys] = useState(['']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === NUMBER_LIMIT);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === NUMBER_LIMIT) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const [productList, setProductList] = useState<ProductProjection[]>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);

  const { queryArgs } = useAppSelector((state) => state.productsSearch);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(setQueryArgs({ limit: 20, fuzzy: true }));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCards({
          limit: queryArgs.limit,
          fuzzy: queryArgs.fuzzy,
          'text.en-US': queryArgs['text.en-US'],
          sort: queryArgs.sort,
        });

        setProductList(res.body.results);
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
      }
    };
    void fetchData();
  }, [queryArgs]);

  const viewCardsList = productList?.map((elem) => <ProductCard key={elem.id} productCardList={elem} />);

  return (
    <Layout className={styles.layoutWrapper}>
      <Content className={styles.layoutContent}>
        <Content className={styles.breadcrumb}>
          <a onClick={() => navigate('/main')}> Main</a>
        </Content>
        <Layout className={styles.menuProductContainerWrapper}>
          <Sider className={styles.menuWrapper}>
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} className={styles.menu} items={items} />
          </Sider>
          <Content className={styles.productContainerWrapper}>
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
