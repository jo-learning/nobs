"use client";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import ShoppingCartButton from "./shoppingcartbutton";
import LanguageSwitcher from "./languageswitcher";
import { useRouter } from "next/router";
import en from "../locales/en/common.json";
import ti from "../locales/ti/common.json";
import CategoryDropdown from "./categorylist";
import LoginAvatar from "./loginavatar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setCartCounter } from "../store/userSlice";

export default function Header() {
  const { locale } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userInfo);
  const cart = useSelector((state) => state.user.cartcounter);
  const [inputValue, setInputValue] = useState("");
  const tanslations = locale === "en" ? en : ti;
  const [shoppingcartcounter, setshoppingcartcounter] = useState(0);

  const [user, setUserss] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    // const cartCounter = localStorage.getItem("cartcounter");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
    // if (cartCounter){
    //   dispatch(setUser(JSON.parse(cartCounter)));

    // }
    
    const handleCartforcounter = async () => {
      const res = await fetch("/api/cart/getcartforcounter");
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("cartcounter", data.cartitem.length);
        dispatch(setCartCounter(data.cartitem.length));
      }
    };
    handleCartforcounter();

    // console.log(users)
  }, []);



  // const handlesearch = async() =>{
  //   router.replace(`/search/${inputValue}`);
  // }

  const handleLogout = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
    });
    localStorage.removeItem("user");
    dispatch(clearUser());
    router.push("/"); // Redirect to login page after logout
  };

  return (
    <>
      <header className="bg-gray-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <nav className="hidden sm:flex">
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <span className="text-black hover:text-gray-400">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-black hover:text-gray-400">About</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-black hover:text-gray-400">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <Link href={"/"}>
            <h1 className="text-black text-3xl font-bold">
              {tanslations.nobs}
            </h1>
          </Link>

          <nav className="mr-9 sm:mr-0">
            <ul className="flex space-x-4">
              <CategoryDropdown />
              <li className=" hidden sm:flex">
                <input
                  className="mr-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <a href={`/search/${inputValue}`}>
                <button
                  className="flex-shrink-0 text-gray-500 hover:text-gray-700 mt-3"
                  // onClick={()=> {handlesearch() }}
                  type="button"
                >
                  
                  <FaSearch size={20} />
                </button>
                </a>
                <LanguageSwitcher />
              </li>
              <li className="mt-2">
                <Link href={"/cart"}>
                  <ShoppingCartButton cartCount={cart} />
                </Link>
              </li>
              {users == null ? (
                <li className="mt-2">
                  <Link href="/login">
                    <span className="text-black hover:text-gray-400  rounded-lg bg-purple-500 p-2">
                      {tanslations.login}
                    </span>
                  </Link>
                </li>
              ) : (
                <LoginAvatar handlelogout={handleLogout} />
              )}
              {/* <LoginAvatar handlelogout={handleLogout} /> */}
            </ul>
          </nav>
        </div>
        <div>
          <ul>
            <li className="mt-2 flex sm:hidden">
              <input className="mr-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full px-4 py-2 border border-gray-300 rounded-lg" />
              <a href={`/search/${inputValue}`}>
                <button
                  className="flex-shrink-0 text-gray-500 hover:text-gray-700 mt-3"
                  // onClick={()=> {handlesearch() }}
                  type="button"
                >
                  
                  <FaSearch size={20} />
                </button>
                </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
