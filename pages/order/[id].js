import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the order ID from the URL query
  const [order, setOrder] = useState(null); // State to store the order details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (id) {
      // Fetch the order details using the id
      fetchOrderDetails(id);
    }
  }, [id]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`); // Assuming there's an API route to get order data
      const data = await response.json();
      if (response.ok) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading order details...</div>;
  }

  if (!order) {
    return <div className="flex justify-center items-center h-screen text-xl">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-6">
          <div>
            <p className="text-gray-600 font-semibold">Order ID</p>
            <p className="text-gray-800">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">User</p>
            <p className="text-gray-800">{order.shipping_address.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Total Price</p>
            <p className="text-gray-800">${order.total_price.toFixed(2)}</p>
          </div>
          {/* <div>
            <p className="text-gray-600 font-semibold">Shipping Address</p>
            <p className="text-gray-800">{order.shipping_address || 'No shipping address provided'}</p>
          </div> */}
          <div>
            <p className="text-gray-600 font-semibold">Status</p>
            <p className={`text-gray-800 capitalize ${order.status === 'shipped' ? 'text-blue-600' : order.status === 'delivered' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>
              {order.status}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Transaction Number</p>
            <p className="text-gray-800">{order.transaction_number || 'N/A'}</p>
          </div>
          {/* <div>
            <p className="text-gray-600 font-semibold">Session</p>
            <p className="text-gray-800">{order.session || 'No session information'}</p>
          </div> */}
          <div>
            <p className="text-gray-600 font-semibold">Payment Method</p>
            <p className="text-gray-800 capitalize">{order.payment_method || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Created At</p>
            <p className="text-gray-800">{new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Updated At</p>
            <p className="text-gray-800">{new Date(order.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
