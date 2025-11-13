import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ArtCardLarge from "../components/ArtCardLarge";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const axios = useAxios();
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllArtworks();
  }, [axios]);

  const loadAllArtworks = () => {
    setLoading(true);
    axios("/artworks/public")
      .then((data) => {
        setArtworks(data.data);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    const search = e.target.search.value;

    axios(`/search?search=${search}`)
      .then((data) => {
        setArtworks(data.data);
      })
      .finally(() => setLoading(false));
  };

  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter((art) => art.category === filter);

  return (
    <section className="flex flex-col items-center justify-center max-w-[1432px] mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="title-main playfair mt-24 text-center"
      >
        Our All Artwork
      </motion.h2>
      <motion.p
        className="paragraph my-3 text-center  w-full md:w-150"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Discover exciting community moments, events, and artist collaborations
        that inspire creativity.
      </motion.p>
      <div className="w-full mb-12 mt-5 md:mt-0 flex flex-col md:flex-row gap-6 justify-between">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select focus:outline-none pl-5 outline-none duration-400 hover:border-accent/50 focus:border-accent/50 rounded-full"
          >
            <option value="all">Sort by category</option>
            <option value="Oil Painting">Oil Painting</option>
            <option value="Acrylic Painting">Acrylic Painting</option>
            <option value="Sketch">Sketch</option>
            <option value="Water Color">Water Color</option>
          </select>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onSubmit={handleSearch}
          className="flex gap-2 items-center justify-center  "
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
            <input name="search" type="search" placeholder="Search" />
          </label>
          {/* btn */}
          <button
            type="submit"
            className="btn-primary-one px-4.5! py-5! rounded-full!"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* card */}
      {loading ? (
        <div className="flex items-center justify-center pb-80 pt-40">
          <Loader />
        </div>
      ) : filteredArtworks.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArtworks.map((data) => (
            <ArtCardLarge key={data._id} data={data} />
          ))}
        </motion.div>
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
