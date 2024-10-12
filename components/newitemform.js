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
  
  const [images, setImages] = useState([]); // This will hold the image file and color for each image
  const [preview, setPreview] = useState([]); // To store image previews
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/allcategory");
        const data = await res.json();
        if (res.ok) {
          setCategories(data.allCategory);
        } else {
          console.log("data not there");
        }
      } catch (err) {
        console.log("Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Set preview URL
      color: "", // Initialize with an empty color
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); // Add the new images to existing ones
  };

  const handleColorChange = (e, index) => {
    const newColor = e.target.value;
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].color = newColor; // Update the color for the specific image
      return updatedImages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images.length === 0) {
      toast.error("Please add at least one image");
      setLoading(false);
      return;
    }

    const imageData = new FormData();
    const colorData = []
    images.forEach((img) => {
      imageData.append("images", img.file);
      imageData.append("colors", img.color);
      colorData.push(img.color);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });
      console.log(colorData)  
      const redata = await res.json();

      if (redata.filePaths) {
        const imageUrl = redata.filePaths; // Assuming this is an array of uploaded image URLs
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ data: formData, imageUrl, colorData }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  if (categories == null) {
    return (
      <>
        <h1 className="text-2xl text-center font-bold">
          You have to create a category first.
        </h1>
      </>
    );
  }

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
              placeholder="Enter the item name in Tigrigna"
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
              Description (Tigrigna)
            </label>
            <textarea
              id="descriptionTg"
              name="descriptionTg"
              value={formData.descriptionTg}
              onChange={handleChange}
              placeholder="Enter the item description in Tigrigna"
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
                placeholder="Enter the stock quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setFormData((prevData) => ({
                  ...prevData,
                  categoryId: e.target.value,
                }));
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_en}{" "}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-2xl font-bold">Upload Images</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-4 mb-4"
            />

            {/* Displaying Images with Color Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="mb-4">
                  <Image
                    src={img.preview}
                    alt={`Image ${index}`}
                    width={100}
                    height={100}
                    className="rounded-md shadow-md"
                  />
                  <input
                    type="color"
                    value={img.color}
                    onChange={(e) => handleColorChange(e, index)}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
