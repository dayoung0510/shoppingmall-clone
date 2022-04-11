import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = (props) => {
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
        props.refreshFunction([...images, response.data.filePath]);
      } else {
        alert('파일을 저장하지 못했습니다.');
      }
    });
  };

  const deleteHandler = (img) => {
    const currentIndex = images.indexOf(img);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction([newImages]);
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
        {images.map((img, idx) => (
          <div key={idx} onClick={() => deleteHandler(img)}>
            <img
              src={`http://localhost:5000/${img}`}
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
