import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  useEffect(() => {
    axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('상품 목록 로드 실패');
      }
    });
  }, []);

  return <div>landing page</div>;
}

export default LandingPage;
