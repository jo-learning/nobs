"use client";
import Collection from "@/components/collection";
import LoadingCircle from "@/components/loaddingcircle";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import en from '../locales/en/common.json';
import ti from '../locales/ti/common.json';


export default function Home() {
  const [products, setProducts] = useState(null);
  const sliderRef = useRef(null);
  const { locale } = useRouter()
  const tanslations = locale === 'en' ? en: ti;

  // Function to handle sliding
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300;
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products/allproduct");
        const data = await res.json();
        if (res.ok) {
          const newdata = data.allProduct;
          // console.log(newdata)
          setProducts(newdata);
        } else {
          toast.error("0 products are there");
        }
      } catch {
        toast.error("Connection Error");
      }
    };
    fetchProduct();
  }, []);

  if (products == null)
    return (
      <div className="justify-center items-center flex-col">
        <h1>Loading ....</h1> <LoadingCircle />
      </div>
    );

  return (
    <div>
      {/* Title of the Collection */}
      <div className="justify-between flex items-center px-10 mt-3">
        <h1 className="text-center text-4xl">Categories</h1>
        <button className="bg-purple-400 p-2 rounded-lg hover:bg-slate-500">Show more</button>
      </div>
      <div className="relative max-w-full">
        {/* Left Slide Button */}
        <button
          onClick={slideLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full z-10 hover:bg-purple-700 focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Quiz Cards */}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll space-x-6 scrollbar-hide py-6 px-4"
        >
          {products.map((product, index) => (
            // <Link key={index} href={`/productdetail/${product.id}`}>
            //   <div className="inline-block text-black mb-3">
            //     <Collection
            //       imageSrc={product.image_url}
            //       productName={product.name_en}
            //       description={product.description_en}
            //       price={`$${product.price}`}
            //     />
            //     {/* <h2 className="text-red-900">fuck you</h2> */}
            //   </div>
            // </Link>
            <div
            key={index}
            className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
          >
          <Link href={`/productdetail/${product.id}`}>
          
            <img
              src={product.image_url}
              alt={product.name}
              className="w-[250px] h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{locale === 'en' ? product.name_en :product.name_tg}</h3>
              <p className="text-sm text-gray-600 mt-2">{locale === 'en' ? product.description_en : product.description_tg}</p>
              <div className="flex items-center mt-3 justify-between">
                <div>
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-gray-800 font-semibold">{4}</span>
                </div>
                <span className="text-gray-800 font-semibold mr-3">${product.price}</span>
              </div>
            </div>
          
          </Link>
          </div>
          ))}
        </div>

        {/* Right Slide Button */}
        <button
          onClick={slideRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full z-10 hover:bg-purple-700 focus:outline-none"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
