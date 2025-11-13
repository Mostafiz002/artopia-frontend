import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { IoHeartOutline } from "react-icons/io5";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState([]);
  const [artCount, setArtCount] = useState(0);
  const { id } = useParams();
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // get single artwork
  useEffect(() => {
    setLoading(true)
    axiosSecure(`/artworks/${id}`).then((data) => {
      setArtwork(data.data);
      setLike(data.data.likes);
      if (data.data.likedBy?.includes(user?.email)) {
        setLiked(true);
      }
    }).finally(()=>setLoading(false))
  }, [axiosSecure, id, user?.email]);

  //  get all artwork for email
  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/artworks?email=${artwork.artistEmail}`).then((data) => {
        setArtCount(data.data.length);
      });
    }
  }, [axiosSecure, artwork.artistEmail, user]);

  //get fav data
  useEffect(() => {
    axiosSecure(`/favorites/${id}`).then((data) => {
      if (data.data.id == id) {
        setFavorite(true);
      }
    });
  }, [axiosSecure, id]);

  const handleLike = () => {
    if (liked) {
      return;
    }

    axiosSecure.patch(`/artworks/like/${id}`).then((data) => {
      if (data.data.modifiedCount > 0) {
        setLike((prev) => prev + 1);
        setLiked(true);
      }
    });
  };

  const handleFavorites = () => {
    if (favorite) {
      return;
    }

    axiosSecure
      .post(`/favorites/${id}`)
      .then((data) => {
        if (data.data.insertedId) {
          setFavorite(true);
          toast.success('Added to favorites')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="py-24 bg-base-100 text-base-content transition-all duration-300">
      
      {loading?  <div className="flex items-center justify-center h-[65vh]">
          <Loader />
        </div>:<div className="max-w-[1432px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Artwork Image */}
          <div className="flex-1">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Artwork Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-4 playfair">
                {artwork.title}
              </h1>
              <p className="paragraph mb-2">Medium: {artwork.medium}</p>
              <p className="text-accent text-sm mb-4">
                Category: {artwork.category}
              </p>
              <p className="text-base-content/80 mb-6">{artwork.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-base-200 p-4 rounded-xl">
                  <p className="text-base-content/60">Dimensions</p>
                  <p className="font-semibold">
                    {artwork.dimensions || "Not Set"}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl">
                  <p className="text-base-content/60">Price</p>
                  <p className="font-semibold">${artwork.price || "Not Set"}</p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl">
                  <p className="text-base-content/60">Visibility</p>
                  <p className="font-semibold capitalize">
                    {artwork.visibility}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl">
                  <p className="text-base-content/60">Posted On</p>
                  <p className="font-semibold">
                    {new Date(artwork.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Artist Info */}
            <div className="flex items-center gap-5 mb-6 border-t border-base-300 pt-6">
              <div className="avatar">
                <div className="w-15 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      artwork.artistImage ||
                      "https://img.icons8.com/color/48/test-account.png"
                    }
                    alt={artwork.artistName}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {artwork.artistName}
                </h3>
                <p className="text-sm text-base-content/70">
                  Email: {artwork.artistEmail}
                </p>
                <p className="text-sm text-base-content/70 mt-1">
                  Total Artworks:{" "}
                  <span className="font-semibold">{artCount}</span>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5! py-5! rounded-full! transition ${
                  liked ? "btn-primary-one py-[21px]!" : "btn-outline-one"
                }`}
              >
                {liked ? <AiFillLike size={16} /> : <AiOutlineLike size={16} />}{" "}
                {like} Likes
              </button>

              <button
                onClick={handleFavorites}
                className={`flex items-center gap-2 px-5! py-5! rounded-full! transition ${
                  favorite ? "btn-primary-one  py-[21px]!" : "btn-outline-one"
                }`}
              >
                {favorite ? (
                  <>
                    <FcLike size={20} /> Added to Favorites{" "}
                  </>
                ) : (
                  <>
                    <IoHeartOutline size={18} /> Add to Favorites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default ArtworkDetails;
