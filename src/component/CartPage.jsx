import { useState, useEffect } from "react";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://e-commerce-backend-five-henna.vercel.app/orders";

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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const customerName =
      localStorage.getItem("userName");

    const customerEmail =
      localStorage.getItem("userEmail");

    if (!customerName || !customerEmail) {
      alert("Please login before checkout");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName,
        customerEmail,

        items: cart.map((item) => ({
          name: item.name,
          image: item.image,
          price: Number(item.price),
          qty: Number(item.qty),
          size: item.size,
          color: item.color,
        })),

        total: Number(total),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Order failed"
        );
      }

      alert("Order placed successfully!");

      localStorage.removeItem("cart");

      setCart([]);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error("Checkout error:", error);

      alert("Something went wrong while placing order.");
    } finally {
      setLoading(false);
    }
  };

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

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Go to Checkout →"}
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default CartPage;