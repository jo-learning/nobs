import { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ConfirmationModal from './confirmationmodal';
import UpdateModal from './updateitemform';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingCircle from './loaddingcircle';

const OrderTable = () => {
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // 10 items per page
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = async(id) => {
    const res = await fetch(`/api/products/deleteproduct/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setProducts(products.filter(product => product.id !== id));
    } else {
      toast.error(data.message);
    }
  };

  const handleUpdate = async(updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  useEffect(() => {
    const allProducts = async () => {
      const res = await fetch("/api/orders/allorders");
      const data = await res.json();
      setProducts(data.allOrder);
    };
    allProducts();
  }, []);

  // Filter products based on search query and category
  const filteredProducts = products?.filter(product => 
    String(product.order_number).toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory ? product.category === filterCategory : true)
  );

  // Get the current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (products == null)
    return (
      <div className="justify-center items-center flex-col">
        <h1>Loading ....</h1> <LoadingCircle />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          className="border p-2"
          placeholder="Search Order..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Category Filter */}
        <select
          className="border p-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Add categories dynamically if available */}
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600">User email</th>
            <th className="px-6 py-3 text-left text-gray-600">total price</th>
            <th className="px-6 py-3 text-left text-gray-600">status</th>
            <th className="px-6 py-3 text-left text-gray-600">transaction</th>
            <th className="px-6 py-3 text-left text-gray-600">paymentM</th>
            <th className="px-6 py-3 text-left text-gray-600">Order Num</th>

            <th className="px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts?.map(product => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">{product.user_id}</td>
              <td className="px-6 py-4 text-gray-800">{product.total_price}</td>
              <td className="px-6 py-4 text-gray-800">{product.status}</td>
              <td className="px-6 py-4 text-gray-800">{product.transaction_number}</td>
              <td className="px-6 py-4 text-gray-800">{product.payment_method}</td>
              <td className="px-6 py-4 text-gray-800">{product.order_number}</td>
              
              <td className="px-6 py-4 flex justify-center gap-4">
                {/* <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setUpdateModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button> */}
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedProduct && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDelete(selectedProduct.id)}
          product={selectedProduct}
        />
      )}

      {selectedProduct && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          onUpdate={handleUpdate}
          product={selectedProduct}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default OrderTable;
