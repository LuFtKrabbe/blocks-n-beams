import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, MenuProps, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';

import ProductCard from '../../components/UI/productCard/productCard';

import styles from '../main/main.module.css';

import { NUMBER_LIMIT, items, rootSubmenuKeys } from './shared';

const { Content, Footer, Sider } = Layout;

const Blocks: FC = (): JSX.Element => {
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBricks = await ProductApi.getCategoriesById(ProductApi.BRICKS_LINK_ID);
        const resAerocrete = await ProductApi.getCategoriesById(ProductApi.AEROCRETE_LINK_ID);
        const resBlocks = [...resBricks.body.results, ...resAerocrete.body.results];
        setProductList(resBlocks);
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

  return (
    <Layout className={styles.layoutWrapper}>
      <Content className={styles.layoutContent}>
        <Content className={styles.breadcrumb}>
          <a onClick={() => navigate('/main')}> Main /</a>
          <a onClick={() => navigate('/main/blocks')}> Blocks </a>
        </Content>
        <Layout className={styles.menuProductContainerWrapper}>
          <Sider className={styles.menuWrapper} width={200}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              selectedKeys={['blocks']}
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

export default Blocks;
