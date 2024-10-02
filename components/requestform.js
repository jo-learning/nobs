import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    about: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inprocess, setInProcess] = useState(false);

  useEffect(() => {
    const requestcheck = async () => {
      const check = await fetch("/api/users/request");
      const data = await check.json();
      if (check.ok) {
        setInProcess(true);
      } else {
        setInProcess(false);
      }
    };
    requestcheck();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // setError(null);

    // Sending login request to /api/user
    const res = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      // If login is successful, store the token and redirect
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      // router.push("/dashboard"); // Redirect to a protected page after login
    } else {
      setIsLoading(false);
      toast.error(data.message);
    }
  };

  return (
    <>
      <header className="bg-white p-4 shadow rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Request Form</h1>
      </header>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description in Tigrigna */}
          {inprocess ? (
            <div>
              <h1>
                You request. We are Checking your request. we will respond Soon.
              </h1>
              <h2>Thank you</h2>
            </div>
          ) : (
            <>
            <h1 className="text-2xl font-bold mb-4">Fill this form</h1>
              <div>
                <label
                  htmlFor="descriptionTg"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  why do you want to be Provider
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="why do you want to be Provider"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Request
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
