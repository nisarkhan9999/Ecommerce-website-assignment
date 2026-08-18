import { useState, useEffect } from "react";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.qty),
    0
  );

  const delivery = cart.length > 0 ? 15 : 0;

  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>
            You haven't added anything to your cart yet.
          </p>
        </div>

      ) : (

        <div className="cart-layout">

          {/* LEFT SIDE */}

          <div className="cart-items">

            {cart.map((item, index) => (

              <div
                className="cart-item"
                key={index}
              >

                <div className="cart-image-box">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                </div>

                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Size:{" "}
                    <span>{item.size}</span>
                  </p>

                  <p>
                    Color:{" "}
                    <span>{item.color}</span>
                  </p>

                  <p>
                    Quantity:{" "}
                    <span>{item.qty}</span>
                  </p>

                  <p className="cart-item-price">
                    ${item.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT SIDE */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                ${delivery.toFixed(2)}
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ${total.toFixed(2)}
              </strong>

            </div>

            <button className="checkout-btn">
              Go to Checkout →
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default CartPage;