import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Products({ items, product }) {
  const [products, setProducts] = useState(product);
  // const [onetimerender, setOneTimeRender] = useState(0);
  // console.log(items)
  // if (items !== null){
  //   setProducts(items)
      
  // }else{
  //   setProducts(product)
  // }

  return (
    <>
    {
    items == null ? (
      <div className=" grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 items-start p-4">

{products.map((product, index) => (
            
            <div
            key={index}
            className="min-w-[150px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
          >
          <Link href={`/productdetail/${product.id}`}>
          <div className="flex items-center justify-center">
            <Image
              src={product.image_url}
              alt={product.name}
              width={250}
              height={250}
              className="w-[250px] h-40 object-cover rounded-md"
            />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{product.name_en}</h3>
              <p className="text-sm text-gray-600 mt-2">{product.description_en}</p>
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
    )
   : (
    <div className=" grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 items-start p-4">
      {items.map((product, index) => (
            
            <div
            key={index}
            className="min-w-[150px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
          >
          <Link href={`/productdetail/${product.id}`}>
          <div className="flex items-center justify-center">
            <Image
              src={product.image_url}
              alt={product.name}
              width={250}
              height={250}
              className="w-[250px] h-40 object-cover rounded-md"
            />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{product.name_en}</h3>
              <p className="text-sm text-gray-600 mt-2">{product.description_en}</p>
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
  )}
    
        
        
      </>
  );
}
