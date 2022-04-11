import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = () => {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.filePath]);
      } else {
        alert('파일을 저장하지 못했습니다.');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                width: 300,
                height: 240,
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input {...getInputProps()} />
              <Icon type='plus' style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'auto',
        }}
      >
        {images.map((i, idx) => (
          <div key={idx}>
            <img
              src={`http://localhost:5000/${i}`}
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              alt=''
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
