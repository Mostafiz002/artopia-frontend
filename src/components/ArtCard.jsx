import React from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ArtCard = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut", delay: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative transition border border-accent/20 bg-base-100 shadow-sm hover:shadow-lg hover:border-accent/40 duration-500 rounded-2xl overflow-hidden hover:-translate-y-2  group"
    >
      {/* Image container */}
      <div className="relative h-50 w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="shine" />
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between h-42">
        <div>
          <h2 className="text-primary font-semibold text-lg md:text-xl mb-1 truncate">
            {data.title}
          </h2>
          <p className="text-info text-sm md:text-base mb-1 truncate">
            {data.category}
          </p>
          <p className="text-accent text-sm md:text-base truncate">
            By {data.artistName}
          </p>
        </div>
        <div className="mt-4">
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={`/artwork-details/${data._id}`}
            className="btn-primary-one w-full!"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtCard;
