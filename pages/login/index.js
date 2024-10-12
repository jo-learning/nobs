'use client'
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingCircle from '@/components/loaddingcircle';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);

    // Sending login request to /api/user
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password}),
    });

    const data = await res.json();

    if (res.ok) {
      // If login is successful, store the token and redirect
      // localStorage.setItem("token", data.token);
      // console.log(data.user)
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (localCart.length !== 0){
        for (let i = 0 ; i < localCart.length; i++){
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({product_id: localCart[i].id, quantity: localCart[i].quantity})
          })
          const data = await res.json();

        }
      }

      

      localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.setItem("role", JSON.stringify(data.user.role))
      
      dispatch(setUser(data.user))

      toast.success(data.message);
      setIsLoading(false);
      router.push("/dashboard"); // Redirect to a protected page after login
    } else {
      setIsLoading(false);
      toast.error(data.message)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6 text-right">
            <Link href="/forgot-password">
              <span className="text-blue-500 text-sm hover:underline">Forgot Password?</span>
            </Link>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {
            isLoading ? (
              <LoadingCircle />
            ) : (
              <span>Login</span>
            )
          }
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apost have an account?{' '}
          <Link href="/signup">
            <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
