import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Link } from "react-router";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favCollection, setFavCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure("/favorites-artworks")
      .then((data) => {
        setFavorites(data.data);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/favorites?email=${user?.email}`)
      .then((data) => {
        setFavCollection(data.data);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, user?.email]);

  const handleUnFavorites = (artId) => {
    const favDoc = favCollection.find((fav) => fav.id === artId);
    if (!favDoc) return;
    setLoading(true);
    const favId = favDoc._id;

    axiosSecure
      .delete(`/favorites/${favId}`)
      .then((data) => {
        if (data.data.deletedCount) {
          setFavorites((prev) => prev.filter((art) => art._id !== artId));
          setFavCollection((prev) => prev.filter((fav) => fav._id !== favId));
          toast.success("Removed from favorites");
        }
      })
      .finally(() => setLoading(false));
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <section className="py-24 bg-base-100 text-base-content transition-all duration-300">
      <div className="max-w-[1432px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-main playfair">My Favorites</h2>
          <p className="paragraph mt-3 w-full md:w-[45%] mx-auto">
            A collection of your most admired artworks - explore, relive, and
            manage your creative inspirations.
          </p>
        </div>
        <div className="overflow-x-auto bg-base-200/50 border border-base-300 rounded-lg shadow-none">
          <table className="hidden md:table w-full">
            <thead className="bg-base-300/40 border-b border-base-300">
              <tr className="text-primary text-base text-center">
                <th className="border border-base-300 rounded-tl-lg py-4">
                  Artwork
                </th>
                <th className="border border-base-300">Title</th>
                <th className="border border-base-300">Likes</th>
                <th className="border border-base-300">Price</th>
                <th className="border border-base-300 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex items-center justify-center py-30">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                favorites.map((art) => (
                  <tr
                    key={art._id}
                    className="text-center hover:bg-base-200 transition duration-300 border-b border-base-300"
                  >
                    <td className="border border-base-300">
                      <Link
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                        to={`/artwork-details/${art._id}`}
                        className="flex justify-center items-center"
                      >
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-20 h-20 object-cover rounded-md border border-base-300"
                        />
                      </Link>
                    </td>
                    <td className="border border-base-300 font-semibold text-primary">
                      {art.title}
                    </td>
                    <td className="border border-base-300 text-accent">
                      <div className="flex justify-center items-center gap-1">
                        <AiFillLike className="text-accent text-lg" />{" "}
                        {art.likes}
                      </div>
                    </td>
                    <td className="border border-base-300 font-medium text-info">
                      ${art.price}
                    </td>
                    <td className="border border-base-300">
                      <button
                        onClick={() => handleUnFavorites(art._id)}
                        className="btn-primary-one rounded-full! flex items-center gap-2 justify-center"
                      >
                        <FaHeartBroken />
                        Unfavorite
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="md:hidden p-4 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-30">
                <Loader />
              </div>
            ) : (
              favorites.map((art) => (
                <div
                  key={art._id}
                  className="border border-base-300 rounded-xl p-4 bg-base-100 shadow-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to={`/artwork-details/${art._id}`}
                    >
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-42 object-cover rounded-xl border border-base-300 shadow"
                      />
                    </Link>
                    <h3 className="text-lg font-semibold text-primary mt-3">
                      {art.title}
                    </h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-accent mt-1">
                        <AiFillLike className="text-lg" /> {art.likes}
                      </div>
                      <p className="text-info font-medium mt-1">${art.price}</p>
                    </div>
                    <button
                      onClick={() => handleUnFavorites(art._id)}
                      className="btn-primary-one rounded-full! flex items-center gap-2 mt-3"
                    >
                      <FaHeartBroken />
                      Unfavorite
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {favorites.length === 0 &&
            (loading ? (
              ""
            ) : (
              <div className="text-center py-20 text-info">
                No favorite artworks yet.
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyFavorites;
