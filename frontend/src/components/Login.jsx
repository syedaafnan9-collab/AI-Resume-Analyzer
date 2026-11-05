import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(formData);
  console.log("LOGIN COMPONENT RENDERED");
  return (
    <>
      <div className="login-container  w-full max-w-[600px] min-h-[400px] p-4 sm:p-6 md:p-8 ">
        <div className="login-header text-center">
          <h1 className="text-4xl text-[#1D2939] font-bold mt-10">
            Welcome Back
          </h1>
          <p className="text-lg text-[#475467] pt-8 pb-8">
            Login In To Continue Your Job journey.
          </p>
        </div>
        <div className="login-form max-w-[600px] min-h-[400px] flex flex-col gap-2 justify-around  border border-12 border-blue-100 shadow-lg p-6 rounded-2xl">
          Email:
          <input
            className="input border border-gray-200 p-4 rounded-2xl text-1xl"
            type="text"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <div className="flex flex-col gap-2">
            <label>Password:</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-200 p-4 pr-12 rounded-2xl"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                👁
              </button>
            </div>
          </div>
          <button
            className="bg-[#6E7AFF] text-white text-2xl rounded-2xl pt-4 pb-4"
            onClick={() => {
              if (!formData.email.trim() || !formData.password.trim()) {
                alert("Please fill in all fields");
              } else {
                alert("Login Successful");

                setFormData({
                  email: "",
                  password: "",
                });
                navigate("/upload");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
