// pages/checkout.js
import { useState } from 'react';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
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
                  placeholder="First Name"
                  className="p-3 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border rounded-md w-full"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="p-3 border rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="p-3 border rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Address"
                className="p-3 border rounded-md w-full"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="p-3 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="p-3 border rounded-md w-full"
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                  className="mr-2"
                />
                Credit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="mr-2"
                />
                PayPal
              </label>

              {/* Conditional rendering for credit card details */}
              {paymentMethod === 'credit-card' && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="p-3 border rounded-md w-full"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expiration Date"
                      className="p-3 border rounded-md w-full"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {/* Items */}
            <div className="flex justify-between">
              <span>Product 1</span>
              <span>$25.99</span>
            </div>
            <div className="flex justify-between">
              <span>Product 2</span>
              <span>$15.49</span>
            </div>

            {/* Summary */}
            <hr />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$41.48</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>$2.50</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$49.97</span>
            </div>
            <button className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
