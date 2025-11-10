import React from "react";
import Banner from "../components/home/Banner";
import FeaturedArtwork from "../components/home/FeaturedArtwork";
import Loader from "../components/Loader";
import TopArtist from "../components/home/TopArtist";
import Community from "../components/home/Community";

const Home = () => {
  return (
    <div>
      <Banner />
      <section className=" max-w-[1432px] mx-auto px-4 my-24">
        <FeaturedArtwork />
      </section>
      <section className=" max-w-[1432px] mx-auto px-4 mb-24">
        <TopArtist />
      </section>
      <section className=" max-w-[1432px] mx-auto px-4 mb-36">
        <Community />
      </section>
    </div>
  );
};

export default Home;
