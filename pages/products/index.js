"use client";
import Collection from "@/components/collection";
import LoadingCircle from "@/components/loaddingcircle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [products, setProducts] = useState(null);
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
      <div className="justify-center items-center">
        <h1 className="text-center text-4xl">title</h1>
      </div>
      <div className=" grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-5 p-4">
        {products.map((product, index) => (
            <Link key={index} href={`/productdetail/${product.id}`}>
            <div className="inline-block text-black mb-3">
            <Collection
            
              imageSrc={product.image_url}
              productName={product.name_en}
              description={product.description_en}
              price={`$${product.price}`}
            />
            {/* <h2 className="text-red-900">fuck you</h2> */}
            </div>
            </Link>
           
            
          
        ))}
        
      </div>
      <ToastContainer />
    </div>
  );
}
