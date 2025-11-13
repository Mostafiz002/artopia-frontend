import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddArtworks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const artistName = e.target.name.value;
    const artistEmail = e.target.email.value;
    const medium = e.target.medium.value;
    const price = e.target.price.value;
    const dimensions = e.target.dimensions.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const visibility = e.target.visibility.value;

    const newArtwork = {
      image,
      title,
      category,
      medium,
      description,
      dimensions,
      price,
      visibility,
      artistName,
      artistEmail,
      artistImage: user.photoURL,
    };

    //post data
    axiosSecure.post("/artworks", newArtwork).then((data) => {
      if (data.data.insertedId) {
        toast.success("Your Artwork has been added");
        e.target.reset();
      }
    });
  };

  return (
    <section className=" flex flex-col md:flex-row  justify-center px-4 mt-30 mb-40 bg-base-100 text-base-content max-w-[1332px] mx-auto">
      <title>Add Artwork - Artopia</title>
      <div className="hidden md:block w-1/2">
        <img
          src="https://i.pinimg.com/736x/4b/4e/ad/4b4ead8134fa05ab6f94b21a228f2837.jpg"
          alt="Art"
          className="object-cover w-full h-full rounded-l-2xl"
        />
      </div>
      <div className="w-full md:w-1/2 bg-base-200/50 border border-base-300 rounded-l-2xl md:rounded-l-none rounded-r-2xl p-8 shadow-lg backdrop-blur-sm flex flex-col justify-center">
        <h2 className="text-3xl playfair font-semibold text-center mb-6">
          Add New Artwork
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm mb-2 text-info">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter artwork title"
              className="input-field"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-2 text-info">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/artwork.jpg"
              className="input-field"
              required
            />
          </div>

          <div className="flex gap-4">
            {/* user name */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Name</label>
              <input
                defaultValue={user.displayName}
                readOnly
                type="text"
                name="name"
                className="input-field"
                required
              />
            </div>

            {/* email */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Email</label>
              <input
                defaultValue={user.email}
                readOnly
                type="email"
                name="email"
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* category */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info!">Category</label>
              <select
                name="category"
                className="input-field  text-accent! py-3.5!"
                required
              >
                <option value="" disabled selected hidden>
                  Select Category
                </option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="Acrylic Painting">Acrylic Painting</option>
                <option value="Sketch">Sketch</option>
                <option value="Water Color">Water Color</option>
              </select>
            </div>

            {/* medium */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Medium</label>
              <input
                type="text"
                name="medium"
                placeholder="e.g., Oil on Canvas, Digital, etc."
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* visibility */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Visibility</label>
              <select
                name="visibility"
                className="input-field  text-accent! py-3.5!"
                required
              >
                <option value="" disabled selected hidden>
                  Select Visibility
                </option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* price */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="input-field"
              />
            </div>
          </div>

          {/* dimensions */}
          <div>
            <label className="block text-sm mb-2 text-info">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              placeholder="Enter dimensions (e.g., 24 x 36 in)"
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-info">Description</label>
            <textarea
              name="description"
              placeholder="Describe your artwork..."
              rows="4"
              className="input-field resize-none"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-secondary text-base-100 hover:bg-secondary/80 transition-colors py-5.5 w-full"
          >
            Add Artwork
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddArtworks;
