import Review from '@/components/review';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure the minimum value is 1
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Handle adding to cart logic
    console.log(`Added ${quantity} items to cart`);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/ecommerce.png" // Replace with your dynamic image source
              alt="Product Name"
              width={500}
              height={500}
              className="rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Product Name
              </h1>
              <p className="text-xl font-semibold text-gray-600 mb-2">$199.99</p>

              <p className="text-gray-700 mb-4">
                This is a great product that solves all your problems! It comes
                with amazing features that you will love.
              </p>

              <div className="flex items-center mb-4">
                <label
                  htmlFor="quantity"
                  className="text-gray-700 font-medium mr-4"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">
                Amazing product! It really helped me improve my workflow.
              </p>
            </div>
            <Review name={"John Doe"} message={"Amazing product! It really helped me improve my workflow."}  stars={3}/>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-900">Jane Smith</p>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">
                The product is great, but shipping took a bit longer than
                expected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
