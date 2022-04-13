import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(4);
  const [postSize, setPostSize] = useState(0);
  const [filters, setfilters] = useState({ continents: [], price: [] });

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post('/api/product/products', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...response.data.productsInfo]);
        } else {
          setProducts(response.data.productsInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('상품 목록 로드 실패');
      }
    });
  };

  const loadMoreHandler = () => {
    let newSkip = skip + limit;

    let body = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(newSkip);
  };

  const renderCards = products.map((product, idx) => {
    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (f) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: f,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (f, category) => {
    const newFilters = { ...filters };
    newFilters[category] = f;

    showFilteredResults(newFilters);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere <Icon type='rocket' />
        </h2>
      </div>

      <CheckBox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, 'continents')}
      />

      <Row gutter={[16, 16]}>{renderCards}</Row>

      {postSize >= limit && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
