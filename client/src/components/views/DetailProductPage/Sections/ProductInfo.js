import React from "react";
import { Button, Badge, Descriptions } from "antd";

const ProductInfo = (props) => {
  const clickHandler = () => {};
  return (
    <>
      <Descriptions title="PRODUCT INFO">
        <Descriptions.Item label="PRICE">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="SOLD">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="VIEW">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="DESCRIPTION">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ display: "flex", justifyContent: "cetner" }}>
        <Button size="lg" shape="round" type="danger" onClick={clickHandler}>
          ADD TO CART
        </Button>
      </div>
    </>
  );
};

export default ProductInfo;
