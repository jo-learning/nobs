// "use client";
// import Review from "@/components/review";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import LoadingCircle from "@/components/loaddingcircle";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from "react-redux";
// import { setCartCounter } from "@/store/userSlice";

// export default function ProductDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch()

//   const handleQuantityChange = (e) => {
//     const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure the minimum value is 1

//     setQuantity(value);
//   };
//   useEffect(() => {
//     const productById = async () => {
//       // const { id } = router.query;
//       try {
//         const res = await fetch(`/api/products/productbyid/${id}`);
//         const data = await res.json();
//         // console.log(router.query)
//         if (res.ok) {
//           setProduct(data.product);
//         }
        
//       } catch (e){
//         console.log(e)
//       }
//     };
//     productById();
//   }, [router.isReady]);


//   // Function to add item to cart
// const addToCart = (item) => {
//   // const isUserLoggedIn = Boolean(user); // Check if the user is logged in

//   // if (isUserLoggedIn) {
//   //   // User is logged in, add item to the database
//   //   saveCartToDatabase(item);
//   // } else {
//     // User is not logged in, add item to localStorage
//     const localCart = JSON.parse(localStorage.getItem('cart')) || [];
//     if (!localCart.some(dir => dir.id === item.id)){
//     localCart.push(item);
//     localStorage.setItem('cart', JSON.stringify(localCart));
//     toast.success("Cart Item Added")  
//     let cartCounter = localStorage.getItem("cartcounter");
//     if (!cartCounter){
//       cartCounter = 0;
//     }
//       localStorage.setItem("cartcounter", parseInt(cartCounter)+1);
//       dispatch(setCartCounter(parseInt(cartCounter)+1));
//   }else{
//     toast.error("Item already Added to Cart")
//   }
//   // }
// };


//   const handleAddToCart = async() => {
//     // Handle adding to cart logic
//     console.log(`Added ${quantity} items to cart`);
    
//     const res = await fetch('/api/cart', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({product_id: product.id, quantity})
//     })
//     const data = await res.json();
//     if(res.ok){
//       //TODO: //a global variable that is assigned to the cart counter on the header
//       toast.success(data.message)
//       console.log(data)
//       let cartCounter = localStorage.getItem("cartcounter");
//       localStorage.setItem("cartcounter", parseInt(cartCounter)+1);
//       dispatch(setCartCounter(parseInt(cartCounter)+1));
//     }
//     else{
//       addToCart({id: product.id, name: product.name_en, price: product.price, image: product.image_url, quantity})
//       // toast.error(data.message)
//       console.log(data)

//     }
//   };

//   if (product == null)
//     return (
//       <div className="justify-center items-center flex-col">
//         <h1>Loading ....</h1> <LoadingCircle />
//       </div>
//     );

//   return (
//     <div className="bg-gray-100 min-h-screen text-black py-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Product Image */}
//           <div className="flex items-center justify-center">
//             <Image
//               src={`/api${product.image_url[0]}`} // Replace with your dynamic image source
//               alt="Product Name"
//               width={500}
//               height={500}
//               className="rounded-lg shadow-md object-cover"
//             />
//           </div>

//           {/* Product Details */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-4">
//                 {product.name_en}
//               </h1>
//               <p className="text-xl font-semibold text-gray-600 mb-2">
//                 ${product.price}
//               </p>

//               <p className="text-black mb-4">
//                 {product.description_en}
//               </p>
//               <p className="text-gray-700 mb-4">154 Reviews
//               ౹  1,000+ sold</p>

//               <div className="flex items-center mb-4">
//                 <label
//                   htmlFor="quantity"
//                   className="text-gray-700 font-medium mr-4"
//                 >
//                   Quantity:
//                 </label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   value={quantity}
//                   onChange={handleQuantityChange}
//                   min="1"
//                   className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* Product Reviews */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Customer Reviews
//           </h2>
//           <div className="space-y-4">
//             <div className="p-4 bg-white rounded-lg shadow-md">
//               <p className="font-semibold text-gray-900">John Doe</p>
//               <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
//               <p className="text-gray-700 mt-2">
//                 Amazing product! It really helped me improve my workflow.
//               </p>
//             </div>
//             {/* <Review
//               name={"John Doe"}
//               message={
//                 "Amazing product! It really helped me improve my workflow."
//               }
//               stars={3.5}
//             /> */}
//             <div className="p-4 bg-white rounded-lg shadow-md">
//               <p className="font-semibold text-gray-900">Jane Smith</p>
//               <p className="text-sm text-gray-600">⭐⭐⭐⭐</p>
//               <p className="text-gray-700 mt-2">
//                 The product is great, but shipping took a bit longer than
//                 expected.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }





// // "use client";
// // import Review from "@/components/review";
// // import Image from "next/image";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/router";
// // import LoadingCircle from "@/components/loaddingcircle";
// // import { ToastContainer, toast } from "react-toastify";
// // import 'react-toastify/dist/ReactToastify.css';
// // import { useDispatch } from "react-redux";
// // import { setCartCounter } from "@/store/userSlice";

// // export default function ProductDetailPage() {
// //   const router = useRouter();
// //   const { id } = router.query;
// //   const [product, setProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedColor, setSelectedColor] = useState(null); // State to manage selected color
// //   const dispatch = useDispatch();

// //   const handleQuantityChange = (e) => {
// //     const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure the minimum value is 1
// //     setQuantity(value);
// //   };

// //   useEffect(() => {
// //     const productById = async () => {
// //       // Mock product data
// //       const mockProduct = {
// //         id: id,
// //         name_en: "Mock Product",
// //         price: 99.99,
// //         description_en: "This is a mock product description.",
// //         colors: [
// //           { name: "Red", hex: "#FF0000" },
// //           { name: "Blue", hex: "#0000FF" },
// //           { name: "Green", hex: "#00FF00" }
// //         ],
// //         images: {
// //           Red: "/images/mock-red-shoe.jpg",
// //           Blue: "/images/mock-blue-shoe.jpg",
// //           Green: "/images/mock-green-shoe.jpg"
// //         }
// //       };
// //       setProduct(mockProduct);
// //       setSelectedColor(mockProduct.colors[0].name); // Default to first color
// //     };

// //     if (router.isReady) {
// //       productById();
// //     }
// //   }, [router.isReady, id]);

// //   const handleColorChange = (color) => {
// //     setSelectedColor(color);
// //   };

// //   const handleAddToCart = async () => {
// //     // Simulated cart functionality
// //     toast.success("Added to cart successfully!");
// //     let cartCounter = localStorage.getItem("cartcounter");
// //     localStorage.setItem("cartcounter", parseInt(cartCounter) + 1);
// //     dispatch(setCartCounter(parseInt(cartCounter) + 1));
// //   };

// //   if (product == null)
// //     return (
// //       <div className="justify-center items-center flex-col">
// //         <h1>Loading ....</h1> <LoadingCircle />
// //       </div>
// //     );

// //   // Get the image based on selected color (mock data)
// //   const selectedImage = product.images[selectedColor] || product.images.Red;

// //   return (
// //     <div className="bg-gray-100 min-h-screen text-black py-8">
// //       <div className="container mx-auto px-4">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {/* Product Image */}
// //           <div className="flex items-center justify-center">
// //             <Image
// //               src={selectedImage} // Image changes based on selected color
// //               alt={product.name_en}
// //               width={500}
// //               height={500}
// //               className="rounded-lg shadow-md object-cover"
// //             />
// //           </div>

// //           {/* Product Details */}
// //           <div className="flex flex-col justify-between">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-800 mb-4">
// //                 {product.name_en}
// //               </h1>
// //               <p className="text-xl font-semibold text-gray-600 mb-2">
// //                 ${product.price}
// //               </p>

// //               <p className="text-black mb-4">
// //                 {product.description_en}
// //               </p>

// //               {/* Color Selection */}
// //               <div className="mb-4">
// //                 <p className="text-gray-700 font-medium mb-2">Available Colors:</p>
// //                 <div className="flex space-x-4">
// //                   {product.colors.map((color) => (
// //                     <button
// //                       key={color.name}
// //                       className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.name ? 'border-blue-500' : 'border-gray-300'}`}
// //                       style={{ backgroundColor: color.hex }}
// //                       onClick={() => handleColorChange(color.name)}
// //                     ></button>
// //                   ))}
// //                 </div>
// //               </div>

// //               <p className="text-gray-700 mb-4">154 Reviews ౹ 1,000+ sold</p>

// //               {/* Quantity Selection */}
// //               <div className="flex items-center mb-4">
// //                 <label
// //                   htmlFor="quantity"
// //                   className="text-gray-700 font-medium mr-4"
// //                 >
// //                   Quantity:
// //                 </label>
// //                 <input
// //                   type="number"
// //                   id="quantity"
// //                   value={quantity}
// //                   onChange={handleQuantityChange}
// //                   min="1"
// //                   className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>

// //             {/* Add to Cart Button */}
// //             <button
// //               onClick={handleAddToCart}
// //               className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               Add to Cart
// //             </button>
// //           </div>
// //         </div>

// //         {/* Product Reviews */}
// //         <div className="mt-12">
// //           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //             Customer Reviews
// //           </h2>
// //           <Review
// //             name={"John Doe"}
// //             message={"Amazing product! It really helped me improve my workflow."}
// //             stars={3}
// //           />
// //         </div>
// //       </div>
// //       <ToastContainer />
// //     </div>
// //   );
// // }






"use client";
import Review from "@/components/review";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingCircle from "@/components/loaddingcircle";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setCartCounter } from "@/store/userSlice";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure the minimum value is 1
    setQuantity(value);
  };

  useEffect(() => {
    const productById = async () => {
      try {
        const res = await fetch(`/api/products/productbyid/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data.product);
          // Set the first image and color by default
          setSelectedImage(data.product.image_url[0]);
          setSelectedColor(data.product.color[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    productById();
  }, [router.isReady]);

  // Function to add item to cart
  const addToCart = (item) => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!localCart.some(dir => dir.id === item.id)) {
      localCart.push(item);
      localStorage.setItem('cart', JSON.stringify(localCart));
      toast.success("Cart Item Added");
      let cartCounter = localStorage.getItem("cartcounter");
      if (!cartCounter) {
        cartCounter = 0;
      }
      localStorage.setItem("cartcounter", parseInt(cartCounter) + 1);
      dispatch(setCartCounter(parseInt(cartCounter) + 1));
    } else {
      toast.error("Item already Added to Cart");
    }
  };

  const handleAddToCart = async () => {
    console.log(`Added ${quantity} items to cart`);

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product_id: product.id, quantity })
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      let cartCounter = localStorage.getItem("cartcounter");
      localStorage.setItem("cartcounter", parseInt(cartCounter) + 1);
      dispatch(setCartCounter(parseInt(cartCounter) + 1));
    } else {
      addToCart({ id: product.id, name: product.name_en, price: product.price, image: selectedImage, quantity });
      console.log(data);
    }
  };

  if (product == null)
    return (
      <div className="justify-center items-center flex-col">
        <h1>Loading ....</h1> <LoadingCircle />
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Image
              src={`/api${selectedImage}`} // Use selected image
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
                {product.name_en}
              </h1>
              <p className="text-xl font-semibold text-gray-600 mb-2">
                ${product.price}
              </p>
              <p className="text-black mb-4">{product.description_en}</p>
              <p className="text-gray-700 mb-4">154 Reviews  ౹  1,000+ sold</p>

              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="text-gray-700 font-medium mr-4">
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

              {/* Color Selection */}
              <div className="mb-4">
                <label className="text-gray-700 font-medium mr-4">Color:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {product.color.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-2 mb-4">
                {product.image_url.map((image, index) => (
                  <Image
                    key={index}
                    src={`/api${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className={`cursor-pointer rounded-lg shadow-md object-cover ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => setSelectedImage(image)} // Set selected image on click
                  />
                ))}
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">Amazing product! It really helped me improve my workflow.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-900">Jane Smith</p>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">Good quality, but the shipping took longer than expected.</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
