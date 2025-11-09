import React from "react";
import errorImg from "../assets/error-404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="bg-base-100 text-base-content min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-300">
      <title>404 Page</title>
      <div className="flex flex-col justify-center items-center gap-10">
        <img src={errorImg} alt="404 Error" className="max-w-sm w-full" />
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-5xl font-semibold text-primary">
            Oops, page not found!
          </p>
          <p className="text-base-content/80">
            The page you are looking for is not available.
          </p>
          <Link to="/" className="btn-primary-one">
            Go Home!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
