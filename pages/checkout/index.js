import { useState, useEffect } from "react";
import Image from "next/image";
import cookie from "cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(""); // Selected payment method
  const [showTransactionModal, setShowTransactionModal] = useState(false); // Show modal for transaction number
  const [showOrderModal, setShowOrderModal] = useState(false); // Show modal for transaction number
  const [transactionNumber, setTransactionNumber] = useState(""); // Transaction number input
  const [errors, setErrors] = useState({}); // To hold billing form validation errors
  const [transactionid, setTransactionId] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetaillock, setUserDetailLock] = useState(false);
  const shippingCost = 5.99;
  const taxes = 2.5;

  const otherPayments = [
    { id: 1, name: "Telebirr", img: "/images/telebirr.jpeg" },
    { id: 2, name: "CBE", img: "/images/CBE.jpeg" },
    { id: 3, name: "Other Banks", img: "/bitcoin.png" },
  ];

  // Function to calculate the total price
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal;
    return total;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`/api/cart/getcart`);
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.cartitem);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCartItems(localCart);
        }
        const res2 = await fetch(`/api/userget`);
        const data2 = await res2.json();
        if (res2.ok) {
          setBillingDetails({
            firstName: data2.user.first_name,
            lastName: data2.user.last_name,
            email: data2.user.email,
            phoneNumber: data2.user.phone,
            address: "",
          });
          setUserDetailLock(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCartItems();
  }, []);

  // Handle input change for billing details
  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  // Validate billing details
  const validateBillingDetails = () => {
    let formErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
      // 'city',
      // 'state',
      // 'zipCode',
    ];

    requiredFields.forEach((field) => {
      if (!billingDetails[field]) {
        formErrors[field] = `${field} is required`;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  // email validate
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle placing order
  const handlePlaceOrder = async () => {
    setLoading(true);
    setEmailMessage("");
    if (!validateBillingDetails()) {
      // If validation fails, do not proceed
      setLoading(false);
      return;
    }
    if (!isValidEmail(billingDetails.email)) {
      setEmailMessage("invaild email format");
      setLoading(false);
      return;
    } else {
      setEmailMessage("");
      const response = await fetch("/api/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: billingDetails.email }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailMessage("");
        setLoading(false);
      } else {
        setEmailMessage("Email is invalid.");
        setLoading(false);
        return;
      }
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Show modal for transaction number if billing details are valid and payment method is selected
    setShowTransactionModal(true);
  };

  // Handle confirming transaction number
  const handleConfirmTransaction = async () => {
    if (transactionNumber) {
      setLoading(true)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          shipping_address: billingDetails,
          transaction_number: transactionNumber,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // setShowTransactionModal(false);
        console.log(data);
        toast.success(data.message);
        setTransactionId(data.transaction_id.id);
        setShowTransactionModal(false);
        setShowOrderModal(true);
        setLoading(false)
      } else {
        toast.error(data.message);
        setShowTransactionModal(false);
        setLoading(false)
      }
    } else {
      alert("Please enter a transaction number.");
      setShowTransactionModal(false);
      setLoading(false)
    }
    // Proceed with the order
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing and Shipping Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`p-3 border rounded-md w-full ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  value={billingDetails.firstName}
                  onChange={handleBillingInputChange}
                  disabled={userDetaillock}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`p-3 border rounded-md w-full ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  value={billingDetails.lastName}
                  onChange={handleBillingInputChange}
                  disabled={userDetaillock}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`p-3 border rounded-md w-full ${
                  errors.email ? "border-red-500" : ""
                } ${emailMessage !== "" ? "border-red-500" : ""}`}
                value={billingDetails.email}
                onChange={handleBillingInputChange}
                disabled={userDetaillock}
              />
              <p className="text-red-500">{emailMessage}</p>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className={`p-3 border rounded-md w-full ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                value={billingDetails.phoneNumber}
                onChange={handleBillingInputChange}
                disabled={userDetaillock}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className={`p-3 border rounded-md w-full ${
                  errors.address ? "border-red-500" : ""
                }`}
                value={billingDetails.address}
                onChange={handleBillingInputChange}
              />
              {/* <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className={`p-3 border rounded-md w-full ${errors.city ? 'border-red-500' : ''}`}
                  value={billingDetails.city}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className={`p-3 border rounded-md w-full ${errors.state ? 'border-red-500' : ''}`}
                  value={billingDetails.state}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  className={`p-3 border rounded-md w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                  value={billingDetails.zipCode}
                  onChange={handleBillingInputChange}
                />
              </div> */}
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 mt-4 ">
              {otherPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`mb-4 lg:m-0 border flex flex-col items-center justify-center rounded-md p-4 cursor-pointer hover:bg-gray-100 ${
                    paymentMethod === payment.name ? "border-blue-500" : ""
                  }`}
                  onClick={() => setPaymentMethod(payment.name)}
                >
                  <Image
                    src={payment.img}
                    alt={payment.name}
                    width={100}
                    height={100}
                    className="items-center justify-center"
                  />
                  <p className="text-center mt-2">{payment.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {/* Items */}
            {cartItems.length > 0 ? (
              cartItems.map((cart) => (
                <div key={cart.id} className="flex justify-between">
                  <span>{cart.name}</span>
                  <span>${cart.quantity * cart.price}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Your checkout is empty.
              </p>
            )}

            {/* Summary */}
            <hr />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(calculateTotal()+ taxes + shippingCost).toFixed(2)}</span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="flex bg-blue-500 text-white py-3 px-6 w-full rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Transaction Number */}
      {showTransactionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Enter Transaction Number</h2>
            <h3>your Transaction Method is {paymentMethod}</h3>
            <h3 className="mb-2">
              using Your {paymentMethod} transfer to +251983525923 <br /> name
              Yohanns Guesh{" "}
            </h3>
            <input
              type="text"
              placeholder="Transaction Number"
              value={transactionNumber}
              onChange={(e) => setTransactionNumber(e.target.value)}
              className="p-3 border rounded-md w-full mb-4"
            />
            <button
              onClick={handleConfirmTransaction}
              className="bg-blue-500 text-white py-3 px-6 w-full rounded-md hover:bg-blue-600"
              disabled={loading}
            >
            <ClipLoader
                color="#ffffff"
                loading={loading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Confirm Transaction
            </button>
          </div>
        </div>
      )}

      {/* Modal for Transaction Number */}
      {showOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6  text-center rounded-lg shadow-md">
            <div className="text-right">
          <button
              onClick={() => {
                setShowOrderModal(false);
              }}
              className="bg-blue-500 text-white p-1 px-2 rounded-md hover:bg-blue-600"
            >
              X
            </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Thank Your For Ordering</h2>
            <h3>
              Order placed with payment method: {paymentMethod} <br />{" "}
              transaction number: {transactionNumber}
            </h3>
            <h3 className="font-bold">
              your Order :{" "}
              <Link
                href={`/order/${transactionid}`}
                className="text-blue-600 underline"
              >
                Click Here
              </Link>
            </h3>
            <h3>please Check your Email For more detail</h3>
            {/* <h3 className='mb-2'>using Your {paymentMethod} transfer to +251983525923 <br /> name Yohanns Guesh </h3> */}
            {/* <input
              type="text"
              placeholder="Transaction Number"
              value={transactionNumber}
              onChange={(e) => setTransactionNumber(e.target.value)}
              className="p-3 border rounded-md w-full mb-4"
            /> */}
            
          </div>
        </div>
      )} 
      <ToastContainer />
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const { req } = context;
//   const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

//   // Check if the authToken exists
//   // if (!cookies.authToken || cookies.role !== 'admin') {
//   // console.log(cookies.role);
//   // console.log(decodeJWT(cookies.authToken))

//     if (!cookies.authToken ) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // Mock user fetching logic based on authToken
//   const user = { id: cookies.authToken };
//   // const user = { id: cookies.authToken, role: cookies.role };

//   return {
//     props: { user }, // Pass user data to the dashboard
//   };
//   }
