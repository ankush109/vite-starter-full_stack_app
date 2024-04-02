import { TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(formData);
    try {
      const response = await loginUser(formData);

      const { data } = response;
      if (response.status === 200) {
        localStorage.setItem("token", data.message.accessToken);
        toast.success("Login Successful", { id: data.message });
        navigate("/");
      }
      setFormData({
        email: "",
        password: "",
      });
      setShowPassword(false);
    } catch (err) {
      toast.error(err.response.data.message, { id: err.response.data.message });
    }
    setFormData({
      email: "",
      password: "",
    });
    setShowPassword(false);
  };

  return (
    <div className="">
      
      <div className="flex  justify-center p-32">
        <div className="flex flex-col gap-4 bg-gray-200 p-10 rounded-lg">
          <p className="text-gray-500">Existing User? </p>
          <h1 className="font-bold text-3xl font-mono">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 my-10">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute top-8 right-1 translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((showPassword) => !showPassword);
                  }}
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex mx-10 p-5">
              <p className="text-gray-500">New User ?</p>
              <p
                className="text-blue-500 mx-1 hover:cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </p>
            </div>
            <button className="py-2 px-10 mx-24 my-4 bg-blue-400 text-white rounded-xl hover:bg-blue-500 hover:text-white hover:scale-110 duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
