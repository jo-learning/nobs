// pages/cart.js
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCartCounter } from "@/store/userSlice";
import Link from "next/link";

export default function Cart() {
  const user = useSelector((state) => state.user.userInfo);
  const  router  = useRouter();
  // Example data
  const dispatch = useDispatch();
  const initialCartItems = [
    // {
    //   id: 1,
    //   name: 'Product 1',
    //   price: 25.99,
    //   quantity: 2,
    //   image: '/images/images.jpeg',
    // },
    // {
    //   id: 2,
    //   name: 'Product 2',
    //   price: 15.49,
    //   quantity: 1,
    //   image: '/images/images 1.webp',
    // },
    // {
    //   id: 3,
    //   name: 'Product 3',
    //   price: 10.0,
    //   quantity: 3,
    //   image: '/images/images.jpeg',
    // },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to remove item from cart
  const removeItem = async (id) => {
    const res = await fetch(`/api/cart/deletecart/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setCartItems(cartItems.filter((item) => item.id !== id));
      let cartCounter = localStorage.getItem("cartcounter");
      localStorage.setItem("cartcounter", parseInt(cartCounter)-1);
      dispatch(setCartCounter(parseInt(cartCounter)-1));
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart= localCart.filter(dir => dir.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setCartItems(updatedCart);
      toast.error(data.message);
    }
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const CartItem = async () => {
      // const { id } = router.query;
      try {
        const res = await fetch(`/api/cart/getcart`);
        const data = await res.json();
        // console.log(router.query)
        if (res.ok) {
          setCartItems(data.cartitem);
        }
        else{
          const localCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCartItems(localCart);
        }
      } catch (e) {
        console.log(e);
      }
    };
    CartItem();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="mr-2">Qty: {item.quantity}</p>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        {/* Summary Section */}
        
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes:</span>
                <span>$2.50</span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(calculateTotal() + 5.99 + 2.5).toFixed(2)}</span>
            </div>
            <Link href={{pathname: '/checkout'}} className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
      </div>
      <ToastContainer />
    </div>
  );
}
