import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateModal = ({ selectedArtId }) => {
  const axiosSecure = useAxiosSecure();
  const { user, setArtworks } = useAuth();
  const [art, setArt] = useState({});

  useEffect(() => {
    axiosSecure(`/artworks/${selectedArtId}`).then((data) => {
      setArt(data.data);
    });
  }, [axiosSecure, selectedArtId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const medium = e.target.medium.value;
    const price = e.target.price.value;
    const dimensions = e.target.dimensions.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const visibility = e.target.visibility.value;
    const update = {
      title,
      image,
      medium,
      price,
      dimensions,
      description,
      category,
      visibility,
    };

    axiosSecure.patch(`/artworks/${selectedArtId}`, update).then((data) => {
      console.log(data);
      if (data.data.modifiedCount == 1) {
        toast.success("Artwork updated");
        axiosSecure(`/artworks/${selectedArtId}`).then((data) => {
          const updatedArt = data.data;
          setArtworks((prev) =>
            prev.map((art) => (art._id === selectedArtId ? updatedArt : art))
          );
          document.getElementById("my_modal_2").close();
        });
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="hidden"
      >
        Update
      </button>
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
              defaultValue={art?.title}
              className="input-field"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-2 text-info">Image URL</label>
            <input
              type="url"
              name="image"
              defaultValue={art?.image}
              className="input-field"
            />
          </div>

          {/* User info */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Name</label>
              <input
                defaultValue={user?.displayName}
                readOnly
                type="text"
                name="name"
                className="input-field"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Email</label>
              <input
                defaultValue={user?.email}
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
                defaultValue={art?.category}
                className="input-field  py-3.5!"
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                <option className="text-accent!" value="Painting">
                  Painting
                </option>
                <option className="text-accent!" value="Photography">
                  Photography
                </option>
                <option className="text-accent!" value="Sculpture">
                  Sculpture
                </option>
                <option className="text-accent!" value="Digital Art">
                  Digital Art
                </option>
                <option className="text-accent!" value="Illustration">
                  Illustration
                </option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Medium</label>
              <input
                type="text"
                name="medium"
                defaultValue={art?.medium}
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
                defaultValue={art?.visibility}
                className="input-field text-info"
              >
                <option value="" disabled hidden>
                  Select Visibility
                </option>
                <option className="text-accent!" value="public">
                  Public
                </option>
                <option className="text-accent!" value="private">
                  Private
                </option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2 text-info">Price ($)</label>
              <input
                type="number"
                name="price"
                defaultValue={art?.price}
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
              defaultValue={art?.dimensions}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-info">Description</label>
            <textarea
              name="description"
              defaultValue={art?.description}
              rows="4"
              className="input-field resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
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
