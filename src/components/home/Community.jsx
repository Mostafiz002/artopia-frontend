import React from "react";

const Community = () => {
  const highlights = [
    {
      title: "Art Auction Event",
      description:
        "Experience live bidding and exclusive artworks with the most promising community.",
      image:
        "https://i.pinimg.com/1200x/11/25/d3/1125d364b0af883c9449cb632e1ce136.jpg",
      user: "Aisha Rahman",
    },
    {
      title: "New Artist Spotlight",
      description:
        "Celebrating emerging artists and their unique styles, stunning designs and collaboration.",
      image:
        "https://i.pinimg.com/1200x/66/c1/7e/66c17efd4162804f18fb300be52d6d73.jpg",
      user: "Sara Karim",
    },
    {
      title: "Collaborative Projects",
      description:
        "Artists joining forces to create stunning and unique collaborative works.",
      image:
        "https://i.pinimg.com/1200x/a3/85/7f/a3857f19ccb45fb90c1463abedeb48c3.jpg",
      user: "Rafiq Ahmed",
    },
  ];

  return (
    <section className=" text-base-content">
      <div>
        <h2 className="title-main playfair">Community Highlights</h2>
        <p className="paragraph mt-3 mb-10 w-full md:w-150">
          Discover exciting community moments, events, and artist collaborations
          that inspire creativity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="relative min-w-[280px] shrink-0 rounded-2xl overflow-hidden border border-accent/20 bg-base-100 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-500 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="shine" />
                </div>
                <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full bg-primary text-base-100">
                  Community
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-info mb-2">{item.description}</p>
                <p className="text-xs text-secondary">By {item.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
