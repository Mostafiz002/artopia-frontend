import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { WiDaySunny } from "react-icons/wi";
import { PiMoonThin } from "react-icons/pi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "light" : "dark");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
              isActive
                ? "bg-base-content/10 text-primary "
                : "text-base-content hover:bg-base-content/10 hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `px-3 py-1 text-sm  rounded-full transition-colors duration-300 ${
              isActive
                ? "bg-base-content/10 text-primary "
                : "text-base-content hover:bg-base-content/10 hover:text-primary"
            }`
          }
        >
          Explore Artworks
        </NavLink>
      </li>
    </>
  );

  return (
    <div className=" border-b border-gray-100 dark:border-gray-900">
      <div className="drawer z-50">
        <input
          id="artopia-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-100 sticky top-0 z-50 max-w-[1432px] mx-auto px-4">
            {/* Logo */}
            <div className=" navbar-start">
              <Link
                to="/"
                className="text-2xl playfair font-extrabold text-primary tracking-wide"
              >
                Artopia
              </Link>
            </div>

            {/* Center*/}
            <div className="navbar-center hidden md:flex">
              <ul className="menu menu-horizontal gap-4 px-1 text-base font-medium">
                {navLinks}
              </ul>
            </div>

            {/* Right */}
            <div className="navbar-end  flex items-center gap-3">
              <label className="swap swap-rotate mt-1">
                {/* this hidden checkbox controls the state */}
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  defaultChecked={localStorage.getItem("theme") === "light"}
                  type="checkbox"
                  className="theme-controller"
                />

                <WiDaySunny className="swap-on h-8 w-8" />

                <PiMoonThin className="swap-off mt-0.5 ml-1" size={26} />
              </label>
              <button className="hidden md:flex btn btn-sm btn-outline border-secondary text-secondary hover:bg-secondary hover:text-base-100 transition-colors">
                Login
              </button>
              <button className="hidden md:flex btn btn-sm bg-secondary text-base-100 hover:bg-secondary/80 transition-colors  py-4">
                Register
              </button>

              {/* Mobile menu icon */}
              <label
                htmlFor="artopia-drawer"
                className="btn btn-ghost btn-circle md:hidden"
              >
                <FaBars className="text-xl" />
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar drawer (mobile/tablet) */}
        <div className="drawer-side">
          <label
            htmlFor="artopia-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content space-y-3 text-lg font-medium">
            <li className="mb-4 text-2xl font-bold text-primary">Artopia</li>
            {navLinks}
            <div className="mt-6 flex flex-col gap-3">
              <button className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-base-100">
                Login
              </button>
              <button className="btn-primary bg-secondary text-base-100 hover:bg-secondary/80">
                Register
              </button>
              <div className="mt-3"></div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
