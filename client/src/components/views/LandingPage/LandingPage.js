import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        setProducts(response.data.productsInfo);
      } else {
        alert('상품 목록 로드 실패');
      }
    });
  }, []);

  const renderCards = products.map((product, idx) => {
    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <Card
          cover={
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5000/${product.images[0]}`}
            />
          }
        >
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere <Icon type='rocket' />
        </h2>
      </div>

      <Row gutter={[16, 16]}> {renderCards}</Row>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
