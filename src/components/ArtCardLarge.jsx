import React from "react";
import { Link } from "react-router";
import { AiFillLike } from "react-icons/ai";

const ArtCardLarge = ({ data }) => {
  return (
    <div className="relative border border-accent/20 bg-base-100 shadow-md hover:shadow-xl hover:border-accent/40 duration-500 rounded-2xl overflow-hidden group transition-transform hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-80 w-full overflow-hidden">
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

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between h-full">
        {/* Artwork Info */}
        <div className="flex flex-col justify-between">
          <h2 className="text-primary font-semibold text-2xl mb-2 truncate">
            {data.title}
          </h2>
          <p className="text-info text-base mb-1 truncate">
            {data.category} — {data.medium}
          </p>
          <p className="text-accent text-base mb-3 truncate">
            By {data.artistName}
          </p>
          <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
            {data.description}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-primary">
              ${data.price?.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 text-accent">
              <AiFillLike />
              <span className="text-sm">{data.likes}</span>
            </div>
          </div>
          <Link onClick={()=>{ window.scrollTo(0, 0);}}
            to={`/artwork-details/${data._id}`}
            className="btn-primary-one w-full! mt-6 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCardLarge;
