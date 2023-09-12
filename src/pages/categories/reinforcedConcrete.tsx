import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, MenuProps, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';
import { useAppSelector } from '../../app/hooks';
// import { setQueryArgs } from '../../app/productsListSlice';
import ProductCard from '../../components/UI/productCard/productCard';

import styles from '../main/main.module.css';

import { NUMBER_LIMIT, items, rootSubmenuKeys } from './shared';

const { Content, Footer, Sider } = Layout;

const ReinforcedConcrete: FC = (): JSX.Element => {
  const [openKeys, setOpenKeys] = useState(['sub2']);

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

  const navigate = useNavigate();

  // const dispatch = useAppDispatch();
  const { queryArgs } = useAppSelector((state) => state.productsSearch);

  // useEffect(() => {
  //   dispatch(
  //     setQueryArgs({ limit: 20, fuzzy: true, filter: `categories.id:"${ProductApi.REINFORCED_CONCRETE_LINK_ID}"` }),
  //   );
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await ProductApi.getCategoriesById(ProductApi.REINFORCED_CONCRETE_LINK_ID);
        const res = await ProductApi.getCards({
          ...queryArgs,
          filter: `categories.id:"${ProductApi.REINFORCED_CONCRETE_LINK_ID}"`,
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
          <a onClick={() => navigate('/main')}> Main /</a>
          <a onClick={() => navigate('/main/beams')}> Beams /</a>
          <a onClick={() => navigate('/main/reinforced-concrete')}> Reinforced concrete</a>
        </Content>
        <Layout className={styles.menuProductContainerWrapper}>
          <Sider className={styles.menuWrapper}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              selectedKeys={['3']}
              className={styles.menu}
              items={items}
            />
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

export default ReinforcedConcrete;
