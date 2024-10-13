'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import LoadingCircle from "@/components/loaddingcircle";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const  { t }  = useTranslation('common');
  const dispatch = useDispatch()


  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setEmailMessage("");



    if (!isValidEmail(email)) {
      setEmailMessage("invaild email format");
      setLoading(false);
      return;
    } else {
      setEmailMessage("");
      const response = await fetch("/api/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailMessage("");
        setLoading(false);
      } else {
        setEmailMessage("Email is invalid.");
        setLoading(false);
        return;
      }
    }




    // console.log(t.t("welcome"));

    // Sending login request to /api/user
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password, phone }),
    });

    const data = await res.json();

    if (res.ok) {
      // If login is successful, store the token and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setUser(data.user))
      // localStorage.setItem("user", data.token);
      toast.success(data.message);
      router.push("/dashboard"); // Redirect to a protected page after login
    } else {
      setError(data.message || "An error occurred");
      toast.error(data.message)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full my-7 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your First name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Last name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailMessage !== "" ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            <p className="text-red-500">{emailMessage}</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading && (<LoadingCircle />)}
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 hover:underline">Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
