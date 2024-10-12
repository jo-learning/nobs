// 'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FiMenu } from "react-icons/fi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useState } from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isAsideOpen, setAsideOpen] = useState(false);
  const [categoryclick, setCategoryClick] = useState(true);
  const [productclick, setProductClick] = useState(true);
  const toggleAside = () => setAsideOpen(!isAsideOpen);
  return (
    <div className="min-h-screen flex text-black">
      <button
        className="md:hidden absolute top-4 right-4 text-gray-700"
        onClick={toggleAside}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-gray-100 fixed inset-0 top-0 md:relative md:w-1/4 p-4 transition-transform duration-300 ease-in-out ${
          isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">
                <span
                  className={clsx("block py-2 px-4 hover:bg-gray-700", {
                    "bg-slate-600": pathname === "/dashboard",
                  })}
                >
                  Overview
                </span>
              </Link>
            </li>
            <li className="w-full">
              <button
                className="w-full justify-between text-start"
                onClick={() => {
                  setCategoryClick(!categoryclick);
                }}
              >
                <span
                  className={clsx("block py-2 px-4 hover:bg-gray-700 flex justify-between items-center")}
                >
                  Category
                  {categoryclick ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </button>
            </li>
            {categoryclick && (
              <ul>
                <li>
                  <Link href="/dashboard/category">
                    <span
                      className={clsx(
                        "block py-2 px-4 hover:bg-gray-700 ml-2",
                        {
                          "bg-slate-600 rounded-lg":
                            pathname === "/dashboard/category",
                        }
                      )}
                    >
                      Category table
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/addcategory">
                    <span
                      className={clsx(
                        "block py-2 px-4 hover:bg-gray-700 ml-2",
                        {
                          "bg-slate-600 rounded-lg":
                            pathname === "/dashboard/addcategory",
                        }
                      )}
                    >
                      Add Category
                    </span>
                  </Link>
                </li>
              </ul>
            )}
            <li className="w-full">
              <button
                className="w-full justify-between text-start"
                onClick={() => {
                  setProductClick(!productclick);
                }}
              >
                <span
                  className={clsx(
                    "block py-2 px-4 hover:bg-gray-700 flex justify-between items-center")}
                >
                  Product
                  {productclick ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </button>
            </li>
            {productclick && (
              <ul>
                <li>
                  <Link href="/dashboard/product">
                    <span
                      className={clsx(
                        "block py-2 px-4 hover:bg-gray-700 ml-2",
                        {
                          "bg-slate-600 rounded-lg":
                            pathname === "/dashboard/product",
                        }
                      )}
                    >
                      product table
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/additem">
                    <span
                      className={clsx(
                        "block py-2 px-4 hover:bg-gray-700 ml-2",
                        {
                          "bg-slate-600 rounded-lg":
                            pathname === "/dashboard/additem",
                        }
                      )}
                    >
                      Add Product
                    </span>
                  </Link>
                </li>
              </ul>
            )}
            <li>
              <Link href="/dashboard/userrequest">
                <span
                  className={clsx("block py-2 px-4 hover:bg-gray-700", {
                    "bg-slate-600": pathname === "/dashboard/userrequest",
                  })}
                >
                  requests
                </span>
              </Link>
            </li>
            
            <li>
              <Link href="/dashboard/providerproduct">
                <span
                  className={clsx("block py-2 px-4 hover:bg-gray-700", {
                    "bg-slate-600": pathname === "/dashboard/providerproduct",
                  })}
                >
                  providerproduct
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/setting">
                <span
                  className={clsx("block py-2 px-4 hover:bg-gray-700", {
                    "bg-slate-600": pathname === "/dashboard/setting",
                  })}
                >
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  );
}
