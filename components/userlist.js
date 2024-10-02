import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfirmationModal from "./confirmationmodal";
import UpdateModal from "./updateitemform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productsData = [
  {
    id: 1,
    name_en: "Product 1",
    image_url: "/image1.jpg",
    category: "Category A",
    price: 20.0,
    stock_quantity: 15,
  },
  {
    id: 2,
    name_en: "Product 2",
    image_url: "/image2.jpg",
    category: "Category B",
    price: 30.0,
    stock_quantity: 10,
  },
];

const UserList = () => {
  const [products, setProducts] = useState(productsData);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const verifyuser = async (id) => {
    const res = await fetch(`/api/user/update/${id}`);
    const data = await res.json();
    if (res.ok) {
      const res1 = await fetch("/api/user/allusers");
      const data1 = await res1.json();
      console.log(data1.allusers);
      setProducts(data1.allusers);
      console.log(data);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/user/deleteuser/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setProducts(products.filter((product) => product.id !== id));
    } else {
      toast.error(data.message);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  useEffect(() => {
    const allusers = async () => {
      const res = await fetch("/api/user/allusers");
      const data = await res.json();
      console.log(data.allusers);
      setProducts(data.allusers);
    };
    allusers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600">F Name</th>
            <th className="px-6 py-3 text-left text-gray-600">L Name</th>
            {/* <th className="px-6 py-3 text-left text-gray-600">Category</th> */}
            <th className="px-6 py-3 text-left text-gray-600">email</th>
            <th className="px-6 py-3 text-left text-gray-600">Phone Number</th>
            <th className="px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">{product.first_name}</td>
              <td className="px-6 py-4">{product.last_name}</td>
              {/* <td className="px-6 py-4 text-gray-800">{product.category}</td> */}
              <td className="px-6 py-4 text-gray-800">{product.email}</td>
              <td className="px-6 py-4 text-gray-800">{product.phone}</td>
              <td className="px-6 py-4 flex justify-center gap-4">
                {product.role == "user" && (
                  <button
                    onClick={() => {
                      // setSelectedProduct(product);
                      // setUpdateModalOpen(true);
                      verifyuser(product.id);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    verified
                  </button>
                )}
                {product.role == "provider" && (
                  <button
                    onClick={() => {
                      // setSelectedProduct(product);
                      // setDeleteModalOpen(true);
                      verifyuser(product.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    unverified
                  </button>
                )}
                {product.role == "admin" && (
                  <button
                    onClick={() => {
                      // setSelectedProduct(product);
                      // setDeleteModalOpen(true);
                    }}
                    disabled
                    className="text-green-400"
                  >
                    admin
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  detail
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

export default UserList;
