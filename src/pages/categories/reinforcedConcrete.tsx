import { GroupOutlined } from '@ant-design/icons';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Layout, Menu, Pagination, PaginationProps, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProductApi from '../../api/Product';
import { useAppSelector } from '../../app/hooks';
import ProductCard from '../../components/UI/productCard/productCard';

import styles from '../main/main.module.css';

import { MenuItem, PAGE_SIZE } from './shared';

const { Content, Footer, Sider } = Layout;

const ReinforcedConcrete: FC = (): JSX.Element => {
  const [productList, setProductList] = useState<ProductProjection[]>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const { queryArgs } = useAppSelector((state) => state.productsSearch);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCardsResults, setTotalCardsResults] = useState(0);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    onTitleClick?: () => void,
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      onTitleClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      'Blocks',
      'blocks',
      <GroupOutlined />,
      [
        getItem(null, '1', <Link to={'/main/bricks'}>Bricks</Link>),
        getItem(null, '2', <Link to={'/main/aerocrete'}>Aerocrete</Link>),
      ],
      undefined,
      () => {
        navigate('/main/blocks');
      },
    ),
    getItem(
      'Beams',
      'beams',
      <GroupOutlined />,
      [
        getItem(null, '3', <Link to={'/main/reinforced-concrete'}>Reinforced concrete</Link>),
        getItem(null, '4', <Link to={'/main/timber'}>Timber</Link>),
      ],
      undefined,
      () => {
        navigate('/main/beams');
      },
    ),
    getItem(<Link to={'/main/aggregates'}>Aggregates</Link>, '5', <GroupOutlined />),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductApi.getCards({
          ...queryArgs,
          offset: (currentPage - 1) * PAGE_SIZE,
          filter: `categories.id:"${ProductApi.REINFORCED_CONCRETE_LINK_ID}"`,
        });

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
          <a onClick={() => navigate('/main')}> Main /</a>
          <a onClick={() => navigate('/main/beams')}> Beams /</a>
          <a onClick={() => navigate('/main/reinforced-concrete')}> Reinforced concrete</a>
        </Content>
        <Layout className={styles.menuProductContainerWrapper}>
          <Sider className={styles.menuWrapper}>
            <Menu mode="vertical" selectedKeys={['3']} className={styles.menu} items={items} />
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
                      pageSize={Number(PAGE_SIZE)}
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

export default ReinforcedConcrete;
