import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, MenuProps, Pagination, PaginationProps, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';

import { useAppSelector } from '../../app/hooks';
import ProductCard from '../../components/UI/productCard/productCard';

import { NUMBER_LIMIT, PAGE_SIZE, items, rootSubmenuKeys } from '../categories/shared';

import styles from './main.module.css';

const { Content, Footer, Sider } = Layout;

const Main: FC = (): JSX.Element => {
  const [openKeys, setOpenKeys] = useState(['']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCardsResults, setTotalCardsResults] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCards({ ...queryArgs, offset: (currentPage - 1) * PAGE_SIZE });

        setProductList(res.body.results);
        if (res.body.total) {
          setTotalCardsResults(res.body.total);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
      }
    };
    void fetchData();
  }, [queryArgs, currentPage]);

  const viewCardsList = productList?.map((elem) => <ProductCard key={elem.id} productCardList={elem} />);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

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
            <div className={styles.cardContainer}>
              {confirmLoading ? (
                <div className={styles.center}>
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  <div className={styles.container}>{viewCardsList}</div>
                  {totalCardsResults > PAGE_SIZE ? (
                    <Pagination
                      style={{ marginTop: 20 }}
                      current={currentPage}
                      onChange={onChange}
                      total={totalCardsResults}
                      pageSize={PAGE_SIZE}
                    />
                  ) : (
                    ''
                  )}
                </>
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
