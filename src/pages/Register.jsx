import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { googleSignIn, setUser, createUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;
    console.log(displayName, email, photoURL, password);

    //error validation
    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      setError([
        "Password must have an Uppercase letter.",
        " Password must have a Lowercase letter.",
        " Password length must be at least 6 characters",
      ]);
      return;
    }

    //create user
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName, photoURL })
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            navigate("/");
            window.scrollTo(0, 0);
            toast.success("Account created successfully");
          })
          .catch((err) => {
            console.log(err);
            setUser(user);
          });
      })
      .catch((err) => {
        let message = "";
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "This email is already registered.";
            break;
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          default:
            message = "An error occurred. Please try again.";
        }
        toast.error(message);
      });
  };

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((res) => {
        navigate("/");
        window.scrollTo(0, 0);
        setUser(res.user);
        toast.success("Logged in successfully with Google");
      })
      .catch(() => {
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-100 text-base-content transition-all duration-300">
      <title>Register - Artopia</title>
      <div className="w-full max-w-md bg-base-200/50 border border-base-300 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h2 className="text-3xl playfair font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-info">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-base-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm mb-2 text-info">Photo URL</label>
            <input
              type="url"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-lg border border-base-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

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
            Register
          </button>
          {error && (
            <div className="mt-5">
              <div className="alert alert-error shadow-lg py-3">
                <MdErrorOutline size={30} />
                <span className="text-sm sm:text-base">{error}</span>
              </div>
            </div>
          )}
          <div className="divider my-6">or</div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignin}
            className="btn btn-outline py-5.5 w-full border-base-300 hover:bg-base-300/50 flex items-center gap-2"
          >
            <FcGoogle size={22} />
            Login with Google
          </button>
          <p className="text-center text-info mt-5 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
