import React from "react";
import Banner from "../components/home/Banner";
import FeaturedArtwork from "../components/home/FeaturedArtwork";
import Loader from "../components/Loader";

const Home = () => {
  return (
    <div>
      <Banner />
      <section className=" max-w-[1432px] mx-auto px-4 my-24">
        <FeaturedArtwork />
      </section>
    </div>
  );
};

export default Home;
