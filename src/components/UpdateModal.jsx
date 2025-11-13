import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateModal = ({ selectedArtId }) => {
  const axiosSecure = useAxiosSecure();
  const { user, setArtworks } = useAuth();
  const [art, setArt] = useState({});

  useEffect(() => {
    if (!selectedArtId) return;
    setArt({}); // Reset before fetching
    axiosSecure(`/artworks/${selectedArtId}`).then((data) => {
      setArt(data.data);
    });
  }, [axiosSecure, selectedArtId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const update = {
      title: art.title,
      image: art.image,
      medium: art.medium,
      price: art.price,
      dimensions: art.dimensions,
      description: art.description,
      category: art.category,
      visibility: art.visibility,
    };

    axiosSecure.patch(`/artworks/${selectedArtId}`, update).then((data) => {
      if (data.data.modifiedCount == 1) {
        toast.success("Artwork updated");
        axiosSecure(`/artworks/${selectedArtId}`).then((data) => {
          const updatedArt = data.data;
          setArtworks((prev) =>
            prev.map((a) => (a._id === selectedArtId ? updatedArt : a))
          );
          document.getElementById("my_modal_2").close();
        });
      }
    });
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <form
          onSubmit={handleUpdate}
          className="modal-box bg-base-100 text-base-content border border-info/20 rounded-2xl p-8 shadow-xl w-[90%] max-w-[700px] transition-all duration-300 text-left space-y-2"
        >
          <h3 className="text-3xl font-semibold text-center mb-6 text-primary">
            Update Artwork
          </h3>

          {/* Title */}
          <div>
            <label className="block text-sm mb-2 text-info">Title</label>
            <input
              type="text"
              name="title"
              value={art.title || ""}
              onChange={(e) => setArt({ ...art, title: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-2 text-info">Image URL</label>
            <input
              type="url"
              name="image"
              value={art.image || ""}
              onChange={(e) => setArt({ ...art, image: e.target.value })}
              className="input-field"
            />
          </div>

          {/* User info */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Name</label>
              <input
                value={user?.displayName || ""}
                readOnly
                type="text"
                name="name"
                className="input-field"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Email</label>
              <input
                value={user?.email || ""}
                readOnly
                type="email"
                name="email"
                className="input-field"
              />
            </div>
          </div>

          {/* Category + Medium */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Category</label>
              <select
                name="category"
                value={art.category || ""}
                onChange={(e) => setArt({ ...art, category: e.target.value })}
                className="input-field text-accent! py-3.5!"
              >
                <option value="" disabled hidden>
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
                value={art.medium || ""}
                onChange={(e) => setArt({ ...art, medium: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {/* Visibility + Price */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Visibility</label>
              <select
                name="visibility"
                value={art.visibility || ""}
                onChange={(e) => setArt({ ...art, visibility: e.target.value })}
                className="input-field text-accent!"
              >
                <option value="" disabled hidden>
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
                value={art.price || ""}
                onChange={(e) => setArt({ ...art, price: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm mb-2 text-info">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={art.dimensions || ""}
              onChange={(e) => setArt({ ...art, dimensions: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-info">Description</label>
            <textarea
              name="description"
              value={art.description || ""}
              onChange={(e) => setArt({ ...art, description: e.target.value })}
              rows="4"
              className="input-field resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full! py-5.5! rounded-full! text-base! btn-primary-one "
          >
            Save Changes
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="cursor-pointer">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UpdateModal;
