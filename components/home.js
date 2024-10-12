"use client";
import Collection from "@/components/collection";
import LoadingCircle from "@/components/loaddingcircle";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import en from '../locales/en/common.json';
import ti from '../locales/ti/common.json';
let images = ''


export default function Home() {
  const [products, setProducts] = useState(null);
  const sliderRef = useRef(null);
  const { locale } = useRouter()
  const router = useRouter();
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
        <h1 className="text-center text-4xl text-blue-700 font-bold">Products</h1>
        <button onClick={()=>{router.push('/products/allproduct')}} className="bg-purple-400 p-2 rounded-lg hover:bg-slate-500">Show more</button>
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
            <div
            key={index}
            className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
          >
          <Link href={`/productdetail/${product.id}`}>
          
            <Image
              src={`/api${product.image_url[0]}`}
              alt={product.name}
              width={250}
              height={250}
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
                <p className="text-gray-700 ">154 Reviews</p>
                
              </div>
              <span className="text-gray-800 font-semibold mr-3">${product.price}  <strike ><span className="text-gray-400">${product.price}</span></strike></span>
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
