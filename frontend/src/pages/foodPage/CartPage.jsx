import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const updatedQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Shopping Cart
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-3/4">
          <div className="shadow-md rounded my-6">
            <table className="min-w-full   border-collapse block md:table">
              <thead className="block    bg-white-200 md:table-header-group">
                <tr className="md:flex justify-between items-center text-primary border-b-2">
                  <th className="text-left p-4 block md:table-cell">Remove</th>
                  <th className="text-left p-4 block md:table-cell">
                    Product Image
                  </th>
                  <th className="text-left p-4 block md:table-cell">
                    Product Title
                  </th>
                  <th className="text-left p-4 block md:table-cell">Price</th>
                  <th className="text-left p-4 block md:table-cell">
                    Quantity
                  </th>
                  <th className="text-left p-4 block md:table-cell">Total</th>
                </tr>
              </thead>
              <tbody className="block  md:table-row-group">
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="md:flex justify-between  items-center py-5 border-b"
                  >
                    <td className="p-4 ml-4 block md:table-cell">
                      <FaTimes
                        className="text-red-500 cursor-pointer"
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                      />
                    </td>
                    <td className="p-4 block md:table-cell">
                      <img
                        src={`/images/${item.imageUrl}`}
                        alt={item.name}
                        className="w-24 h-24 object-cover ml-[70px] rounded-md"
                      />
                    </td>
                    <td className="p-4 block ps-16 md:table-cell">
                      {item.name}
                    </td>
                    <td className="p-4 block ps-16 md:table-cell">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="p-4 block md:table-cell">
                      <div className="flex items-center   justify-center">
                        <FaMinus
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, -1)}
                        />
                        <input
                          type="text"
                          className="w-12 text-center mx-2"
                          value={item.quantity}
                          readOnly
                        />
                        <FaPlus
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, 1)}
                        />
                      </div>
                    </td>
                    <td className="p-4 block md:table-cell">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-1/4 h-fit mt-6 p-6 border-2 text-primary rounded-lg">
          <h2 className="text-xl font-bold mb-6">Cart totals</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${getTotal()}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span>Total</span>
            <span>${getTotal()}</span>
          </div>
          <Link
            to="/checkout"
            className="bg-primary text-white text-center p-2 block rounded-md font-bold"
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>

      <Link
        to="/food"
        style={{ display: "block", marginTop: "1rem", marginBottom: "2rem" }}
      >
        ← Return To Shop
      </Link>
    </div>
  );
};

export default Cart;
