import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, MenuProps, Spin, message, theme } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';

import ProductCard from '../../components/UI/productCard/productCard';

import styles from './main.module.css';
import { NUMBER_LIMIT, items, rootSubmenuKeys } from './shared';

const { Content, Footer, Sider } = Layout;

const Bricks: FC = (): JSX.Element => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCategoriesById(ProductApi.BRICKS_LINK_ID);

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
  }, []);

  const viewCardsList = productList?.map((elem) => <ProductCard key={elem.id} productCardList={elem} />);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Content style={{ margin: '16px 0' }}>
          <a onClick={() => navigate('/main')}> Main /</a>
          <a onClick={() => navigate('/main/aerocrete')}> Blocks: Bricks</a>
        </Content>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              selectedKeys={['1']}
              style={{ width: 280 }}
              items={items}
            />
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

export default Bricks;
