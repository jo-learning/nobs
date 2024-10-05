import { useState, useEffect } from 'react';
import Image from 'next/image';
import cookie from 'cookie'

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState(''); // Selected payment method
  const [showTransactionModal, setShowTransactionModal] = useState(false); // Show modal for transaction number
  const [transactionNumber, setTransactionNumber] = useState(''); // Transaction number input
  const [errors, setErrors] = useState({}); // To hold billing form validation errors
  const shippingCost = 5.99;
  const taxes = 2.50;

  const otherPayments = [
    { id: 1, name: 'Apple Pay', img: '/applepay.png' },
    { id: 2, name: 'Google Pay', img: '/googlepay.png' },
    { id: 3, name: 'Bitcoin', img: '/bitcoin.png' },
  ];

  // Function to calculate the total price
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal + taxes + shippingCost;
    return total;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`/api/cart/getcart`);
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.cartitem);
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
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'address',
      'city',
      'state',
      'zipCode',
    ];

    requiredFields.forEach((field) => {
      if (!billingDetails[field]) {
        formErrors[field] = `${field} is required`;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle placing order
  const handlePlaceOrder = () => {
    if (!validateBillingDetails()) {
      // If validation fails, do not proceed
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Show modal for transaction number if billing details are valid and payment method is selected
    setShowTransactionModal(true);
  };

  // Handle confirming transaction number
  const handleConfirmTransaction = () => {
    if (!transactionNumber) {
      alert('Please enter a transaction number.');
      return;
    }

    // Proceed with the order
    alert(`Order placed with payment method: ${paymentMethod} and transaction number: ${transactionNumber}`);
    setShowTransactionModal(false);
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
                  className={`p-3 border rounded-md w-full ${errors.firstName ? 'border-red-500' : ''}`}
                  value={billingDetails.firstName}
                  onChange={handleBillingInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`p-3 border rounded-md w-full ${errors.lastName ? 'border-red-500' : ''}`}
                  value={billingDetails.lastName}
                  onChange={handleBillingInputChange}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`p-3 border rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
                value={billingDetails.email}
                onChange={handleBillingInputChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className={`p-3 border rounded-md w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
                value={billingDetails.phoneNumber}
                onChange={handleBillingInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className={`p-3 border rounded-md w-full ${errors.address ? 'border-red-500' : ''}`}
                value={billingDetails.address}
                onChange={handleBillingInputChange}
              />
              <div className="grid grid-cols-3 gap-4">
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
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 mt-4 ">
              {otherPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`mb-4 lg:m-0 border rounded-md p-4 cursor-pointer hover:bg-gray-100 ${
                    paymentMethod === payment.name ? 'border-blue-500' : ''
                  }`}
                  onClick={() => setPaymentMethod(payment.name)}
                >
                  <Image
                    src={payment.img}
                    alt={payment.name}
                    width={50}
                    height={50}
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
              <p className="text-center text-gray-500">Your checkout is empty.</p>
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
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white py-3 px-6 w-full rounded-md hover:bg-blue-600"
            >
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
            >
              Confirm Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  
  // Check if the authToken exists
  // if (!cookies.authToken || cookies.role !== 'admin') {
  // console.log(cookies.role);
  // console.log(decodeJWT(cookies.authToken))
  
    if (!cookies.authToken ) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Mock user fetching logic based on authToken
  const user = { id: cookies.authToken };
  // const user = { id: cookies.authToken, role: cookies.role };
  
  return {
    props: { user }, // Pass user data to the dashboard
  };
  }