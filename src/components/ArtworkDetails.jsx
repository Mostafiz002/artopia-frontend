import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { IoHeartOutline } from "react-icons/io5";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    setLoading(true);
    axiosSecure(`/artworks/${id}`)
      .then((data) => {
        setArtwork(data.data);
        setLike(data.data.likes);
        if (data.data.likedBy?.includes(user?.email)) {
          setLiked(true);
        }
      })
      .finally(() => setLoading(false));
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
          toast.success("Added to favorites");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="py-24 bg-base-100 text-base-content transition-all duration-300">
      {loading ? (
        <div className="flex items-center justify-center h-[65vh]">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="max-w-[1432px] mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col lg:flex-row gap-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {/* Artwork Image */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                transition={{ type: "spring", stiffness: 120 }}
              />
            </motion.div>

            {/* Artwork Info */}
            <motion.div
              className="flex-1 flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
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
                  <motion.div
                    className="bg-base-200 p-4 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-base-content/60">Dimensions</p>
                    <p className="font-semibold">
                      {artwork.dimensions || "Not Set"}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-base-200 p-4 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-base-content/60">Price</p>
                    <p className="font-semibold">
                      ${artwork.price || "Not Set"}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-base-200 p-4 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-base-content/60">Visibility</p>
                    <p className="font-semibold capitalize">
                      {artwork.visibility}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-base-200 p-4 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-base-content/60">Posted On</p>
                    <p className="font-semibold">
                      {new Date(artwork.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Artist Info */}
              <motion.div
                className="flex items-center gap-5 mb-6 border-t border-base-300 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
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
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5! py-5! rounded-full! transition ${
                    liked ? "btn-primary-one py-[21px]!" : "btn-outline-one"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {liked ? (
                    <AiFillLike size={16} />
                  ) : (
                    <AiOutlineLike size={16} />
                  )}{" "}
                  {like} Likes
                </button>

                <button
                  onClick={handleFavorites}
                  className={`flex items-center gap-2 px-5! py-5! rounded-full! transition ${
                    favorite ? "btn-primary-one  py-[21px]!" : "btn-outline-one"
                  }`}
                  whileTap={{ scale: 0.9 }}
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ArtworkDetails;
