import React from "react";
import { AiFillLike } from "react-icons/ai";

const MyGallery = () => {
  // Dummy data
  const artworks = [
    {
      _id: "1",
      image:
        "https://i.pinimg.com/736x/15/78/ad/1578ad209a9b26b0a61a54a0a60abd1a.jpg",
      title: "The Starry Night",
      likes: 91,
      price: 120,
    },
    {
      _id: "2",
      image:
        "https://i.pinimg.com/736x/4b/4e/ad/4b4ead8134fa05ab6f94b21a228f2837.jpg",
      title: "Silent Whispers",
      likes: 54,
      price: 95,
    },
    {
      _id: "3",
      image:
        "https://i.pinimg.com/736x/18/a7/a6/18a7a6afb3276256f7e4996509856502.jpg",
      title: "Morning Glow",
      likes: 73,
      price: 150,
    },
  ];

  return (
    <section className="py-24 bg-base-100 text-base-content transition-all duration-300">
      <div className="max-w-[1432px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="title-main playfair">My Gallery</h2>
          <p className="paragraph mt-3 w-full md:w-[45%] mx-auto">
            Explore your uploaded artworks — manage, edit, and keep track of
            your creative portfolio.
          </p>
        </div>

        {/* Table for desktop */}
        <div className="overflow-x-auto bg-base-200/50 border border-base-300 rounded-2xl shadow-lg">
          <table className="hidden md:table w-full text-center border-collapse">
            <thead className="bg-base-300/40 border-b border-base-300">
              <tr className="text-primary text-base">
                <th className="border border-base-300 rounded-tl-2xl py-4">
                  Artwork
                </th>
                <th className="border border-base-300">Title</th>
                <th className="border border-base-300">Likes</th>
                <th className="border border-base-300">Price</th>
                <th className="border border-base-300 rounded-tr-2xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((art) => (
                <tr
                  key={art._id}
                  className="text-center hover:bg-base-200 transition duration-300 border-b border-base-300"
                >
                  <td className="border border-base-300">
                    <div className="flex justify-center items-center">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-20 h-20 object-cover rounded-xl border border-base-300 shadow-sm"
                      />
                    </div>
                  </td>
                  <td className="border border-base-300 font-semibold text-primary">
                    {art.title}
                  </td>
                  <td className="border border-base-300 text-accent">
                    <div className="flex justify-center items-center gap-1">
                      <AiFillLike className="text-accent text-lg" /> {art.likes}
                    </div>
                  </td>
                  <td className="border border-base-300 font-medium text-info">
                    ${art.price}
                  </td>
                  <td className="border border-base-300">
                    <div className="flex justify-center items-center gap-2">
                      <button className="btn-primary-one">Update</button>
                      <button className="btn-primary-one  text-info!  bg-red-600! hover:bg-red-700! transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* view for mobile */}
          <div className="md:hidden p-4 space-y-6">
            {artworks.map((art) => (
              <div
                key={art._id}
                className="border border-base-300 rounded-2xl p-4 bg-base-100 shadow-sm"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-48 object-cover rounded-xl border border-base-300 shadow"
                  />
                  <h3 className="text-lg font-semibold text-primary mt-3">
                    {art.title}
                  </h3>
                  <div className="flex gap-4 mt-2 items-center justify-center">
                    <div className="flex items-center gap-1 text-accent">
                      <AiFillLike className="text-lg" /> {art.likes}
                    </div>
                    <p className="text-info font-medium">${art.price}</p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button className="btn-primary-one">Update</button>
                    <button className="btn-primary-one btn-primary-one  text-info!  bg-red-600! hover:bg-red-700! transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Empty State */}
          {artworks.length === 0 && (
            <div className="text-center py-10 text-info">
              You haven't uploaded any artworks yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyGallery;
