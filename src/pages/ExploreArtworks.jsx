import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ArtCardLarge from "../components/ArtCardLarge";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    loadAllArtworks();
  }, [axios]);

  const loadAllArtworks = () => {
    axios("/artworks/public").then((data) => {
      setArtworks(data.data);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;

    axios(`/search?search=${search}`).then((data) => {
      setArtworks(data.data);
    });
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-[1432px] mx-auto px-4">
      <h2 className="title-main playfair mt-24 text-center">Our All Artwork</h2>
      <p className="paragraph my-3 text-center  w-full md:w-150">
        Discover exciting community moments, events, and artist collaborations
        that inspire creativity.
      </p>
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center justify-center  mb-12 "
      >
        <label className="input rounded-full md:w-76  focus:outline-none  outline-none duration-400 hover:border-accent/50 focus:border-accent/50">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" required placeholder="Search" />
        </label>
        {/* btn */}
        <button
          type="submit"
          className="btn-primary-one px-4.5! py-5! rounded-full!"
        >
          Search
        </button>
      </form>
      {artworks.length > 0 ? (
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((data) => (
            <ArtCardLarge key={data._id} data={data} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-info text-center text-lg">
            No artworks found. Try a different search.
          </p>
          <button
            onClick={loadAllArtworks}
            className="mb-24 mt-5 btn-primary-one"
          >
            Load All
          </button>
        </>
      )}
    </section>
  );
};

export default ExploreArtworks;
