import React from "react";
import { LuBadgeCheck } from "react-icons/lu";

const TopArtist = () => {
  const artists = [
    {
      name: "Pablo Picasso",
      specialty: "Digital Illustrator",
      image:
        "https://i.pinimg.com/1200x/98/1a/52/981a52f016e6526d00e04a428ec1469c.jpg",
    },
    {
      name: "Johannes Vermeer",
      specialty: "Concept Artist",
      image:
        "https://i.pinimg.com/736x/f6/19/3b/f6193b8e3adb1d71a074b902d022c304.jpg",
    },
    {
      name: "Leonardo da Vinci",
      specialty: "Fine Art Painter",
      image:
        "https://i.pinimg.com/736x/dd/2e/f6/dd2ef68efff7eab10566f783817b322a.jpg",
    },
    {
      name: "Vincent van Gogh",
      specialty: "3D Sculptor",
      image:
        "https://i.pinimg.com/1200x/65/a1/9d/65a19d851442d5816097cadbae1c34fa.jpg",
    },
  ];

  return (
    <section className="py-20 bg-base-100 text-base-content transition-colors duration-500">
      <div className="">
        <h2 className="title-main playfair">
          Top Artists of the Week
        </h2>
        <p className="paragraph mt-3 mb-10  w-full md:w-[45%]">
          Experience the brilliance of this week’s most inspiring creators and
          their unique artistic visions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="relative  group rounded-2xl overflow-hidden bg-base-100 border border-accent/20 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-90 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-base-100/90 via-base-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="shine" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {artist.name}
                </h3>
                <p className="text-sm text-info mb-3">{artist.specialty}</p>
                <span className="inline-flex gap-1 items-center px-3 py-1 text-xs font-medium uppercase rounded-full bg-primary text-base-100">
                  <LuBadgeCheck size={15} /> Top Artist
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtist;
