import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ArtCard from "../ArtCard";

const FeaturedArtwork = () => {
  const [featuredArts, setFeaturedArt] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios("/artworks/featured").then((data) => {
      setFeaturedArt(data.data);
    });
  }, [axios]);

  return (
    <div>
      <h2 className="title-main playfair">Featured Artworks</h2>
      <p className="paragraph mt-3 mb-8">
        Join us for an exhilarating live auction experience where art meets
        excitement.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArts.map((data) => (
          <ArtCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtwork;
