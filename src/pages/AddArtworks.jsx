import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

    axiosSecure.post("/artworks", newArtwork).then((data) => {
      if (data.data.insertedId) {
        toast.success("Your Artwork has been added");
        e.target.reset();
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row justify-center px-4 mt-30 mb-40 bg-base-100 text-base-content max-w-[1332px] mx-auto">
      <title>Add Artwork - Artopia</title>

      <motion.div
        className="hidden md:block w-[40%] relative overflow-hidden rounded-l-2xl"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="https://i.pinimg.com/1200x/bc/4d/f3/bc4df30ff5fe95967e512daaf6b6baef.jpg"
          alt="Art"
          className="object-cover w-full h-full rounded-l-2xl"
        />

        {/*  glowing circle */}
        <motion.div
          className="absolute top-[31%] left-[36%] w-40 h-40 rounded-full bg-white opacity-10"
          animate={{
            scale: [0.87, 0.9, 0.87],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
      <motion.div
        className="w-full md:w-[60%] bg-base-200/50 border border-base-300 rounded-l-2xl md:rounded-l-none rounded-r-2xl p-8 shadow-lg backdrop-blur-sm flex flex-col justify-center"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl playfair font-semibold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Add New Artwork
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
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
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info!">Category</label>
              <select
                name="category"
                className="input-field text-accent! py-3.5!"
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
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Visibility</label>
              <select
                name="visibility"
                className="input-field text-accent! py-3.5!"
                required
              >
                <option value="" disabled selected hidden>
                  Select Visibility
                </option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

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

          <div>
            <label className="block text-sm mb-2 text-info">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              placeholder="Enter dimensions (e.g., 24 x 36 in)"
              className="input-field"
            />
          </div>

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

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-secondary text-base-100 hover:bg-secondary/80 transition-colors py-5.5 w-full"
          >
            Add Artwork
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default AddArtworks;
