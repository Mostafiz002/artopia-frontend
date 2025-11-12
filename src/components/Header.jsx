import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { WiDaySunny } from "react-icons/wi";
import { PiMoonThin } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import { Slide } from "react-awesome-reveal";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const { user, logOut, setUser } = useAuth();
  console.log(user);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "light" : "dark");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  const navLinkClass = ({ isActive }) =>
    `relative  py-1 text-sm font-medium transition-colors duration-300
        ${
          isActive
            ? "text-primary after:w-full after:scale-x-100"
            : "text-base-content hover:text-primary after:w-full hover:after:scale-x-100"
        }
        after:content-[''] after:absolute after:left-0 after:bottom-0
        after:h-[2px] after:bg-primary after:transition-transform
        after:duration-300 after:origin-left after:scale-x-0`;

  const navLinks = (
    <>
      <li>
        <NavLink
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to="/"
          className={navLinkClass}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to="/explore-artworks"
          className={navLinkClass}
        >
          Explore Artworks
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to="/add-artworks"
          className={navLinkClass}
        >
          Add Artwork
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to="/my-gallery"
          className={navLinkClass}
        >
          My Gallery
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to="/my-favorites"
          className={navLinkClass}
        >
          My Favorites
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-100 dark:border-gray-900">
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
          <div className="navbar bg-base-100 max-w-[1432px] mx-auto px-4">
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
            <div className="navbar-center hidden lg:flex">
              <ul className="flex gap-6  text-base font-medium">{navLinks}</ul>
            </div>

            {/* Right */}
            <div className="navbar-end  flex items-center gap-3">
              <label className="swap swap-rotate mt-1 lg:mr-2">
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  defaultChecked={localStorage.getItem("theme") === "light"}
                  type="checkbox"
                  className="theme-controller"
                />
                <WiDaySunny className="swap-on h-8 w-8" />
                <PiMoonThin className="swap-off mt-0.5 ml-1" size={26} />
              </label>

              {!user && (
                <>
                  {" "}
                  <Link
                    to="/login"
                    className="hidden md:flex btn btn-sm btn-outline border-secondary text-secondary hover:bg-secondary hover:text-base-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hidden md:flex btn btn-sm bg-secondary text-base-100 hover:bg-secondary/80 transition-colors  py-4"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Mobile menu icon */}
              <label
                htmlFor="artopia-drawer"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <FaBars className="text-xl" />
              </label>
              {user && (
                <div className="relative inline-block group">
                  <div className="avatar cursor-pointer">
                    <div className="w-8 rounded-full ring-2 ring-secondary">
                      <img
                        src={
                          user?.photoURL ||
                          "https://img.icons8.com/color/48/test-account.png"
                        }
                        alt={user?.displayName || "Default User"}
                      />
                    </div>
                  </div>

                  {/* Dropdown */}
                  <Slide direction="down" triggerOnce={false}>
                    <div className="absolute right-0 mt-2 w-40 bg-base-200 text-base-content rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2 border-b border-base-content/20 text-center">
                        <span className="font-medium ">
                          {user?.displayName || "Guest"}
                        </span>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="btn-primary-one w-full! "
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </Slide>
                </div>
              )}
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
          <ul className="menu p-4  w-72 min-h-full bg-base-100 text-base-content space-y-3 text-lg font-medium">
            <li className="mb-4 text-2xl font-bold text-primary">Artopia</li>
            {navLinks}
            <div className="mt-6 flex flex-col gap-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-secondary text-base-100 hover:bg-secondary/80"
                >
                  Logout
                </button>
              ) : (
                <>
                  {" "}
                  <Link
                    to="/login"
                    className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-base-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn bg-secondary text-base-100 hover:bg-secondary/80"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
