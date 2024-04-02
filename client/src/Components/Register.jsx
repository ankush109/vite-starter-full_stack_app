import { TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      console.log("Submitting", formData);
      const { data } = await registerUser(formData);
      toast.success("Registered successfully");
      navigate("/Login");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setShowPassword(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="flex  h-screen justify-center p-28">
        <div className="flex flex-col gap-4 bg-gray-200 p-10 rounded-lg">
          <p className="text-gray-500">New User? </p>
          <h1 className="font-bold text-3xl font-mono">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 my-10">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="w-full rounded-lg text-white"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
              <p className="text-gray-500">Already have an account? </p>
              <p
                className="text-blue-500 hover: cursor-pointer"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                {"  "}
                Sign In
              </p>
            </div>
            <button className="py-2 px-10 mx-24 my-4 bg-blue-400 text-white rounded-xl hover:bg-blue-500 hover:text-white hover:scale-110 duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
