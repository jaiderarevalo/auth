import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondo from "../images/fondo1.jpg";

function RegisterPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    signup(values);
  };

  return (
    <div className="flex  items-center  justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full h-full bg-cover rounded-t-lg" 
    style={{ backgroundImage: `url(${fondo})` }}>
      <div className=" w-2/5 border-2 p-8 border-purple-300 rounded-2xl  space-y-8">
        <div className="">
          <h2 className="mt-6 text-center text-3xl text-white font-extrabold ">
            Sign Up
          </h2>
        </div>
        {RegisterError.map((error, i) => (
          <h1
            className=" bg-gradient-to-tr from-purple-700 to-black text-center text-2xl rounded-2xl text-white capitalize py-2"
            key={i}
          >
            {error}
          </h1>
        ))}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm   ">
            <div className="py-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white py-2"
              >
                Username
              </label>
              <input
                type="text"
                autoFocus
                autoComplete="username"
                placeholder="Enter your username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  Username is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white py-2"
              >
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">Email is required</p>
              )}
            </div>
            <div className="py-2">
              <label className="block text-sm font-medium text-white py-2">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-center text-white">
            do you already have an account? <Link to="/login">Clic</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RegisterPages;
