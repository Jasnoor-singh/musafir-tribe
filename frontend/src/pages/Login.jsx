import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextValue";
import axios from "../lib/api";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";
import signupp from "../assets/Mobile login-bro.png"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Icons for input fields
import Button from "../components/Button";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally { setSubmitting(false); }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen bg-[#FAF8ED]">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#FAF8ED] h-full px-8 lg:px-24">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/collection')} className="text-sm underline mb-6">← Back to journeys</button>
          {/* Logo */}
          <div className="mb-4 text-center">
            <img
              src={assets.logo}
              alt="logo"
              className="w-32 md:w-48 mx-auto" // Larger logo
            />
            <p className="text-black font-semibold text-lg">Ready to explore new Places ?</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            {/* Name Input (Sign Up only) */}
            {currentState === "Sign Up" && (
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-yellow-600" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-yellow-600" />
              <input
                type="email"
                aria-label="Email" autoComplete="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-yellow-600" />
              <input
                type="password"
                aria-label="Password" minLength={currentState === "Sign Up" ? 8 : undefined} autoComplete={currentState === "Sign Up" ? "new-password" : "current-password"}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit" disabled={submitting}
              className="w-full  text-white rounded-md text-lg font-medium  transition shadow-lg"
            >
              {submitting ? "Please wait…" : currentState === "Login" ? "Login now" : "Sign up now"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-1/3 border-gray-300" />
            <p className="text-sm text-gray-400">OR</p>
            <hr className="w-1/3 border-gray-300" />
          </div>

          {/* Toggle Between Login and Sign Up */}
          <Button
            className="w-full  text-white rounded-md text-lg font-medium  transition shadow-lg mt-4"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currentState === "Login" ? "Signup now" : "Login now"}
          </Button>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#FAF8ED] justify-center items-center h-full">
        <img
          src={signupp}
          alt="illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
