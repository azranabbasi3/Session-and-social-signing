import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { loginSchema } from "../../validations/auth.schema";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/login",
          values,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          navigate("/profile");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      }
    },
  });


  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubSignIn = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass-effect max-w-md w-full space-y-8 p-8 rounded-2xl shadow-2xl auth-animate">
        <div className="space-y-4">
          <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            New to our platform?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="social-button w-full flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-200 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <FaGoogle className="h-5 w-5 mr-2 text-red-500" />
            Continue with Google
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGithubSignIn}
              className="social-button flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-200 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              <FaGithub className="h-5 w-5 mr-2" />
              GitHub
            </button>

            <button
              onClick={() => {}}
              className="social-button flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-200 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </button>
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-900 text-gray-400 rounded-full">
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={`pl-10 w-full px-4 py-3 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Email address"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1 ml-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className={`pl-10 w-full px-4 py-3 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1 ml-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800/50"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="gradient-border">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="relative w-full flex justify-center py-3 px-4 border-0 rounded-lg text-sm font-medium text-white bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
