import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleSignIn, setUser, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //signin
    signIn(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
        window.scrollTo(0, 0);
        toast.success("Logged in successfully");
      })
      .catch((err) => {
        let message = "";
        switch (err.code) {
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          case "auth/user-disabled":
            message = "This account has been disabled. Contact support.";
            break;
          case "auth/user-not-found":
            message = "No account found with this email.";
            break;
          case "auth/invalid-credential":
            message =
              "Invalid credentials. Please check your email and password.";
            break;
          case "auth/wrong-password":
            message =
              "Invalid credentials. Please check your email and password.";
            break;
          case "auth/too-many-requests":
            message =
              "Too many unsuccessful login attempts. Please try again later.";
            break;
          default:
            message = "An unexpected error occurred. Please try again.";
        }
        toast.error(message);
      });
  };

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((res) => {
        navigate(`${location.state ? location.state : "/"}`);
        window.scrollTo(0, 0);
        setUser(res.user);
        toast.success("Logged in successfully with Google");
      })
      .catch((err) => {
        toast.error("Google sign-in failed. Please try again.");
        console.log(err);
      });
  };
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-100 text-base-content transition-all duration-300">
      <title>Login - Artopia</title>
      <div className="w-full max-w-md bg-base-200/50 border border-base-300 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h2 className="text-3xl playfair font-semibold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-info">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-base-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-info">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-base-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4  cursor-pointer text-base-content/70 hover:text-base-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-secondary text-base-100 hover:bg-secondary/80 transition-colors  py-5.5 w-full"
          >
            Login
          </button>
          <div className="divider my-6">or</div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignin}
            className="btn btn-outline py-5.5 w-full border-gray-300 dark:border-base-200 hover:bg-base-300/50 flex items-center gap-2"
          >
            <FcGoogle size={22} />
            Login with Google
          </button>
          <p className="text-center text-info mt-5 text-sm">
            Don't have an account?{" "}
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              to="/register"
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
