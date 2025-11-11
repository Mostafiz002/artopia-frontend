import React from "react";
import { Link } from "react-router";

const ArtCard = ({ data }) => {
  return (
    <div className="relative transition border border-accent/20 bg-base-100 shadow-sm hover:shadow-lg hover:border-accent/40 duration-500 rounded-2xl overflow-hidden hover:-translate-y-2  group">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden">
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
      <div className="p-4 flex flex-col justify-between h-48">
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
            // to={`/artworks/${data._id}`}
            className="btn-primary-one rounded-xl!"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
