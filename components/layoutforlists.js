// 'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FiMenu } from "react-icons/fi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import React, { useState } from "react";
import PriceFilter from "./pricefilter";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isAsideOpen, setAsideOpen] = useState(false);
  const [categoryclick, setCategoryClick] = useState(true);
  const [productclick, setProductClick] = useState(true);
  const toggleAside = () => setAsideOpen(!isAsideOpen);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFilteredItems = async (minPrice, maxPrice) => {
    try {
    setLoading(true)
      const res = await fetch(`/api/products/searchproduct`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
        minPrice:minPrice, maxPrice:maxPrice
    })
      });
      const data = await res.json();
      setItems(data.items);
    //   console.log(data.items);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching filtered items:', error);
      setLoading(false)
    }
  };
  return (
    <div className="min-h-screen flex text-gray-400">
      <button
        className="md:hidden absolute top-4 right-4 text-gray-700"
        onClick={toggleAside}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-300 text-black fixed inset-0 top-0 md:relative md:w-1/4 p-4 transition-transform duration-300 ease-in-out ${
          isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
       
        <nav>
          <ul>
            <div className="border-b-2">
            <li className="w-full">
              <button
                className="w-full justify-between text-start"
                onClick={() => {
                  setCategoryClick(!categoryclick);
                }}
              >
                <span
                  className={clsx("block py-2 px-4 flex justify-between items-center")}
                >
                  Price
                  {categoryclick ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </button>
            </li>
            {categoryclick && (
              <ul>
                <PriceFilter onFilter={fetchFilteredItems} />
              </ul>
            )}
            </div>
           

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-1">{React.Children.map(children, (child) => {
          return React.cloneElement(child, { items });})}</div>
      {
        loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
      }
    </div>
  );
}
