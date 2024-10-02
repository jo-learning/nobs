import { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ConfirmationModal from './confirmationmodal';
import UpdateModal from './updateitemform';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const productsData = [
  { id: 1, name_en: 'Product 1', image_url: '/image1.jpg', category: 'Category A', price: 20.00, stock_quantity: 15 },
  { id: 2, name_en: 'Product 2', image_url: '/image2.jpg', category: 'Category B', price: 30.00, stock_quantity: 10 },
];

const ProductTable = () => {
  const [products, setProducts] = useState(productsData);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = async(id) => {
    const res = await fetch(`/api/providerproducts/deleteproduct/${id}`,{
      method: 'DELETE'
    })
    const data = await res.json()
    if (res.ok){
      toast.success(data.message)
    setProducts(products.filter(product => product.id !== id));
  }
  else{
    toast.error(data.message);
  }
  };

  const handleUpdate = async(updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  useEffect(()=>{
    const allProudcts = async()=>{
      const res = await fetch("/api/providerproducts/allproduct")
      const data = await res.json()
      console.log(data.allProduct)
      if (data.allProduct){
        console.log(data.allProduct)
      setProducts(data.allProduct)}
    }
    allProudcts();
  },[]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600">Product Name</th>
            <th className="px-6 py-3 text-left text-gray-600">Image</th>
            {/* <th className="px-6 py-3 text-left text-gray-600">Category</th> */}
            <th className="px-6 py-3 text-left text-gray-600">Price</th>
            <th className="px-6 py-3 text-left text-gray-600">Stock</th>
            <th className="px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">{product.name_en}</td>
              <td className="px-6 py-4">
                <img src={product.image_url} alt={product.name_en} className="w-16 h-16 object-cover rounded" />
              </td>
              {/* <td className="px-6 py-4 text-gray-800">{product.category}</td> */}
              <td className="px-6 py-4 text-gray-800">${product.price}</td>
              <td className="px-6 py-4 text-gray-800">{product.stock_quantity}</td>
              <td className="px-6 py-4 flex justify-center gap-4">
                {/* <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setUpdateModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button> */}
                <button
                  onClick={() => {
                    // setSelectedProduct(product);
                    // setDeleteModalOpen(true);
                  }}
                  disabled
                  className="text-black hover:text-red-600"
                >
                 {product.verify ? (<>verified</>) : (<>pending</>)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
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

export default ProductTable;
