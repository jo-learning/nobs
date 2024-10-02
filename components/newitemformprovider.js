import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewItemForm() {
  const [formData, setFormData] = useState({
    nameEn: "",
    nameTg: "",
    descriptionEn: "",
    descriptionTg: "",
    stockQuantity: "",
    categoryId: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoriestest, setCategoriesTest] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (image == null) {
      toast.error("add an image");
      setLoading(false);
      return;
    }
    const imageData = new FormData();
    imageData.append("image", image);
    const re = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });
    const redata = await re.json();
    if (redata.filePath) {
      const imageUrl = redata.filePath;
      const res = await fetch("/api/providerproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: 'include',
        body: JSON.stringify({ data:formData, imageUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        // If login is successful, store the token and redirect
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        // router.push("/dashboard"); // Redirect to a protected page after login
      } else {
        // setError(data.message || "An error occurred");
        toast.error(data.message);
      }
    } else {
      toast.error("image not uploaded Try again");
      return;
    }
  };

  return (
    <>
      <header className="bg-white p-4 shadow rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Add Item</h1>
      </header>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name in English */}
          <div>
            <label
              htmlFor="nameEn"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name (English)
            </label>
            <input
              type="text"
              id="nameEn"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              placeholder="Enter the item name in English"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Name in Spanish */}
          <div>
            <label
              htmlFor="nameTg"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name (Tigrigna)
            </label>
            <input
              type="text"
              id="nameTg"
              name="nameTg"
              value={formData.nameTg}
              onChange={handleChange}
              placeholder="Ingrese el nombre del artículo en español"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description in English */}
          <div>
            <label
              htmlFor="descriptionEn"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description (English)
            </label>
            <textarea
              id="descriptionEn"
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              placeholder="Enter the item description in English"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Description in Tigrigna */}
          <div>
            <label
              htmlFor="descriptionTg"
              className="block text-gray-700 font-semibold mb-2"
            >
              Descripción (Tigrigna)
            </label>
            <textarea
              id="descriptionTg"
              name="descriptionTg"
              value={formData.descriptionTg}
              onChange={handleChange}
              placeholder="Ingrese la descripción del artículo en español"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-between">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-semibold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter the price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-gray-700 font-semibold mb-2"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Enter the price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Image URL
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter the image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
          

          {/* Image Upload */}

          <div>
            <h2 className="text-2xl font-bold mb-6">Upload an Image</h2>

            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Image
              </label>
              <input
                id="file-upload"
                type="file"
                name="image"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {preview && (
              <div className="mb-4">
                <Image
                  src={preview}
                  alt="Image Preview"
                  width={100}
                  height={100}
                  className="rounded-md shadow-md"
                />
              </div>
            )}

            {/* <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload Image
          </button> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
