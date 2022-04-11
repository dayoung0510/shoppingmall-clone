import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title: AntdTitle } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
];

const UploadProductPage = (props) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [continent, setContinent] = useState(1);
  const [imgs, setImgs] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };
  const descChangeHandler = (event) => {
    setDesc(event.currentTarget.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const continentsChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImgs(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title || !desc || !price || !continent | !imgs) {
      return alert('모든 값이 필요합니다');
    }

    const body = {
      //로그인된 사람의 ID
      writer: props.user.userData._id,
      title: title,
      description: desc,
      price: price,
      images: imgs,
      continent: continent,
    };

    Axios.post('/api/product', body).then((response) => {
      if (response.data.success) {
        alert('업로드에 성공했습니다.');
        props.history.push('/');
      } else {
        alert('실패...');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <AntdTitle level={2}>여행 상품 업로드</AntdTitle>
      </div>
      <Form onSubmitCapture={submitHandler}>
        <FileUpload refreshFunction={updateImages} />

        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title} />
        <label>설명</label>
        <TextArea onChange={descChangeHandler} value={desc} />
        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={price} />
        <select onChange={continentsChangeHandler} value={continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <Button htmlType='submit'>확인</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
