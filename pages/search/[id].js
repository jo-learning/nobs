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


// export async function getServerSideProps(context) {
//     const { id } = context.query; // Accessing query parameters if needed
  
//     // Fetch data from an external API or database
//     let product = [];
//         console.log(id);
//         try {
//           const res = await fetch(`http://localhost:3000/api/products/searchproducts`,
//               {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({search: id})
//               }
//           );
//           const data = await res.json();
//           console.log(data.AllProducts)
//           if (res.ok) {
//             if (data.AllProducts){
//               product = data.AllProducts;}
//               // console.log(newdata)
              
//             //   setProducts(data.allProducts)
  
//           } else {
//             toast.error("0 products are there");
//           }
//         } catch {
//           toast.error("Connection Error");
//         }
//       return {
//         props: {
//           product,
//         },
//       };

// }

export default function Home() {
  const [products, setProducts] = useState(null);
  const router = useRouter()
  const { id } = router.query;
  
  useEffect(() => {
    const fetchProduct = async () => {
      console.log(id);
      try {
        const res = await fetch(`/api/products/searchproducts`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({search: id})
            }
        );
        const data = await res.json();
        if (res.ok) {
            const newdata = data.AllProducts;
            // console.log(newdata)
            
            setProducts(data.allProducts)

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
