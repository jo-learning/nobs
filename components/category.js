"use client";
import Collection from "@/components/collection";
import LoadingCircle from "@/components/loaddingcircle";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const [category, setcategory] = useState(null);
  const sliderRef = useRef(null);

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
        const res = await fetch("/api/category/allcategory");
        const data = await res.json();
        if (res.ok) {
          const newdata = data.allCategory;
          // console.log(newdata)
          setcategory(newdata);
        } else {
          toast.error("0 products are there");
        }
      } catch {
        toast.error("Connection Error");
      }
    };
    fetchProduct();
  }, []);

  if (category == null)
    return (
      <div className="justify-center items-center flex-col">
        <h1>Loading ....</h1> <LoadingCircle />
      </div>
    );

  return (
    <div>
      {/* Title of the Collection */}
      <div className="justify-between flex items-center px-10 mt-3">
        <h1 className="text-center text-4xl text-blue-700 font-bold">Categories</h1>
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
          {category.map((categori, index) => (
            // <Link key={index} href={`/products/${categori.name_en}`}>
            //   <div className="inline-block text-black mb-3">
            //     <Collection
            //       // TODO: // add image_url to database of category
            //       imageSrc={"/images/images.jpeg"}
            //       productName={categori.name_en}
            //       description={categori.description_en}
            //       price={""}
            //     />
            //     {/* <h2 className="text-red-900">fuck you</h2> */}
            //   </div>
            // </Link>

            <div
            key={index}
            className="min-w-[100px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0 w-[150px]"
          >
          <Link href={`/products/${categori.name_en}`}>
          
            <Image
              src="/images/images.jpeg"
              alt={categori.name_en}
              width={250}
              height={250}
              className="w-[250px] h-[90px] object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{categori.name_en}</h3>
              <p className="text-sm text-gray-600 mt-2">{categori.description_en}</p>
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
