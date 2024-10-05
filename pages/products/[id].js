"use client";
import Collection from "@/components/collection";
import LoadingCircle from "@/components/loaddingcircle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Layout from "@/components/layoutforlists";
import Products from "@/components/products";

export default function Home() {
  const [products, setProducts] = useState(null);
  const router = useRouter()
  const { id } = router.query;
  
  useEffect(() => {
    const fetchProduct = async () => {
      console.log(id);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
            const newdata = data.product;
            // console.log(newdata)
            if(newdata){
          setProducts(newdata);}
          else{
            setProducts(data.allProduct)
          }

        } else {
          toast.error("0 products are there");
        }
      } catch {
        toast.error("Connection Error");
      }
    };
    fetchProduct();
  }, [router.isReady, id]);

  if (products == null)
    return (
      <div className="justify-center items-center flex-col">
        <h1>Loading ....</h1> <LoadingCircle />
      </div>
    );

  return (
    <div className="bg-gray-200">
      <Layout>
      {/* Title of the Collection */}
      {/* <div className="justify-center items-center">
        <h1 className="text-center text-4xl">title</h1>
      </div> */}
      <Products  product = {products}/>
      </Layout>
      <ToastContainer />
    </div>
  );
}
