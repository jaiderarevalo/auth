import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import fondo from "../images/fondo1.jpg";

function LoginPages() {
  const { errors: signinError, signin, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    signin(user);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated]);
  return (
    <div className="grid grid-cols-2">
      <section>
        <img className="h-screen" src={fondo} />
      </section>
      <div className=" flex  justify-center  min-h-screen bg-gray-50 py-5 px-4 sm:px-6 lg:px-8 w-full h-full  ">
        <div className="">
          <div className=" w-full border-2 p-8 border-purple-300  h-96 rounded-2xl ">
            <div>
              <h2 className=" text-center text-3xl font-extrabold ">Login</h2>
            </div>
            <section>
              {signinError.map((error, i) => (
                <h1
                  className="bg-gradient-to-tr from-purple-700 to-black text-center text-2xl rounded-2xl text-white capitalize py-2 "
                  key={i}
                >
                  {error}
                </h1>
              ))}
            </section>
            <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium  py-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      Email is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium  py-2">
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
              <div className="flex">
                <button
                  type="submit"
                  className="group relative w-44 m-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
              <div>
                <h1 className="text-center ">
                  You do not have an account ? <Link to="/register">Click</Link>
                </h1>
              </div>
            </form>
          </div>
          <div className="bg-blue-400 flex justify-center">
            <section className="py-5 w-full h-full text-center">
              <a
                className="bg-red-400 w-full block  font-medium text-xl "
                href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?approval_prompt=force&client_id=438303160091-2v96mru5mn075n2foabpddbne5ais5ik.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapp.trackingtime.co%2Fv4%2Fgoogle%2Fsignin%2Fcallback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=google--1454566120&service=lso&o2v=1&flowName=GeneralOAuthFlow"
              >
                <i className="text-xl">
                  <ion-icon name="logo-google"></ion-icon>
                </i>
                sing in with Google
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;
