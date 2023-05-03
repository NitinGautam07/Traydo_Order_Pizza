import React, { useEffect, useState } from "react";
import "./Cart.css";


const Cart = (props) => {
  const {img,quantity}=props;
  const [qty, setQty] = useState(quantity);
  const [discount, setDiscount] = useState(0);
  const [addon, setAddon] = useState(false);

  useEffect(() => {
    const storedQty = localStorage.getItem("qty");
    if (storedQty) {
      setQty(parseInt(storedQty));
    }
  }, []);

  const price = 50;

  const Price_addon = addon ? 5 : 0;
  const total = (qty ===0 ? 0 : price*qty);
  const F_total=(total)+ Price_addon

  const total_discount = (1 - discount / 100) * F_total;

  const handleQtyChange = (value) => {
    const newQty = qty + value;
    localStorage.setItem("qty", newQty);
    if (newQty >= 0) {
      setQty(newQty);
    }
  };

  const handleAddonChange = (e) => {
    if (qty > 0) {
      setAddon(e.target.checked);
    }
  };
  const handleDiscountChange = (e) => {
    const newDiscount = parseInt(e.target.value);
    if (newDiscount >= 0 && newDiscount <= 60) {
      setDiscount(newDiscount);
    } else if(newDiscount>60) {
      alert("Discount cannot be more than 60%");
      setDiscount(0);
    }
  };

  return (
    <div className="container">
      <div className="heading_container">
        <h1>Pizza ABC</h1>
        <p>We are currently serving one pizza only. Please taste and review</p>
      </div>
      <div className="content_box">
        <div className="quantity_box">
          <h2>Add Quantity</h2>
          <div className="quantity">
            <button onClick={() => handleQtyChange(-1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => handleQtyChange(1)}>+</button>
          </div>
          <div className="addons">
            <input
              type="checkbox"
              checked={addon}
              onChange={handleAddonChange}
              disabled={qty === 0}
            />
            <label>Add ons </label>
          </div>
        </div>
        <div className="pizza">
          <img src={img} alt="Pizza" />
        </div>
      </div>

      <div className="total_price_container">
        <table className="price">
          <tr className="total">
            <td>Total</td>
            <td>${total}</td>
          </tr>
          <tr className="discount">
            <td>Discount (%)</td>
            <td>
              <input
                type="number"
                value={discount}
                onChange={handleDiscountChange}
              />
            </td>
          </tr>
          <tr className="discounted-total">
            <td>To Pay</td>
            <td>${total_discount.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Cart;
