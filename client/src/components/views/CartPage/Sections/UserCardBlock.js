import React from "react";
import "./UserCardBlock.css";

const UserCardBlock = (props) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map((product) => (
      <tr>
        <td>
          <img
            style={{ width: "70%" }}
            alt="product"
            src={renderCartImage(product.img)}
          />
        </td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td>
          <button type="button">REMOVE</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from cart</th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default UserCardBlock;
