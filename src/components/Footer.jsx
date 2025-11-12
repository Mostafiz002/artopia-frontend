import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="footer sm:footer-horizontal text-base-content py-10 max-w-[1432px] mx-auto px-4">
        {/* Left Section */}
        <aside>
          <h2 className="text-2xl playfair font-bold text-primary">Artopia</h2>
          <p className="max-w-xs text-base-content/70 mt-2">
            Discover, collect, and showcase stunning digital artworks from
            creators around the world.
          </p>
        </aside>

        {/* Quick Links */}
        <div>
          <h6 className="footer-title playfair">Quick Links</h6>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/"
            className="link link-hover"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/explore-artworks"
            className="link link-hover"
          >
            Explore Artworks
          </Link>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/login"
            className="link link-hover"
          >
            Login
          </Link>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/register"
            className="link link-hover"
          >
            Register
          </Link>
        </div>

        {/* Services */}
        <div>
          <h6 className="footer-title playfair">Services</h6>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/add-artworks"
            className="link link-hover"
          >
            Add Artwork
          </Link>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/my-gallery"
            className="link link-hover"
          >
            My Gallery
          </Link>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/my-favorites"
            className="link link-hover"
          >
            My Favorites
          </Link>
        </div>

        {/* Social Links */}
        <div>
          <h6 className="footer-title playfair">Contact & Social</h6>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-base-content/70">
            <p className="flex items-center gap-2">
              {" "}
              <FaMapMarkerAlt className="text-secondary" /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-secondary" /> +880 1752-080666
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-secondary" /> mo.mahin4@gmail.com
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/mahinmostafiz.m/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-base-100 hover:bg-secondary hover:text-base-100 duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/mostafiz04"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-base-100 hover:bg-secondary hover:text-base-100 duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/Mostafiz002"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-base-100 hover:bg-secondary hover:text-base-100 duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-base-content/70">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">Artopia</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
