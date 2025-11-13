import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ArtCard from "../ArtCard";
import Loader from "../Loader";

const FeaturedArtwork = () => {
  const [featuredArts, setFeaturedArt] = useState([]);
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("/artworks/featured")
      .then((data) => {
        setFeaturedArt(data.data);
      })
      .finally(() => setLoading(false));
  }, [axios]);

  return (
    <div>
      <h2 className="title-main playfair">Featured Artworks</h2>
      <p className="paragraph mt-3 mb-8 w-full md:w-150">
        Join us for an exhilarating live auction experience where art meets
        excitement.
      </p>
      {loading ? (
        <div className="flex items-center justify-center pb-80 pt-40">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArts.map((data) => (
            <ArtCard key={data._id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedArtwork;
