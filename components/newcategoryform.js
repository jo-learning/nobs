import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function NewCategoryForm() {
  const [formData, setFormData] = useState({
    nameEn: "",
    nameTg: "",
    descriptionEn: "",
    descriptionTg: "",
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // setError(null);

    // Sending login request to /api/user
    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      // If login is successful, store the token and redirect
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      // router.push("/dashboard"); // Redirect to a protected page after login
    } else {
      setIsLoading(false);
      toast.error(data.message)
    }
  };

  return (
    <>
    <header className="bg-white p-4 shadow rounded-lg mb-6">
          <h1 className="text-2xl font-bold">Add Category</h1>
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

        {/* Name in Tigrigna */}
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
