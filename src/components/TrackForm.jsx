import { useState } from "react";

export default function TrackForm({ onAddTrack }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [errors, setErrors] = useState({ title: "", artist: "" });

  function validate(label, value) {
    const v = value.trim();
    if (!v) return `${label} is required.`;
    if (v.length < 2) return `${label} must be at least 2 characters.`;
    return "";
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const label = name === "title" ? "Title" : "Artist";
    setErrors((prev) => ({ ...prev, [name]: validate(label, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const titleErr = validate("Title", title);
    const artistErr = validate("Artist", artist);
    if (titleErr || artistErr) {
      setErrors({ title: titleErr, artist: artistErr });
      return;
    }
    onAddTrack({ title: title.trim(), artist: artist.trim() });
    setTitle("");
    setArtist("");
    setErrors({ title: "", artist: "" });
  }

  const formValid =
    validate("Title", title) === "" && validate("Artist", artist) === "";

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-body-tertiary border-0 shadow-sm mb-4"
    >
      <div className="card-body">
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="visually-hidden">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`form-control bg-dark text-light border-secondary ${
              errors.title ? "is-invalid" : ""
            }`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            aria-describedby="titleError"
          />
          <div
            id="titleError"
            className="invalid-feedback d-block"
            aria-live="polite"
          >
            {errors.title}
          </div>
        </div>

        {/* Artist */}
        <div className="mb-3">
          <label htmlFor="artist" className="visually-hidden">
            Artist
          </label>
          <input
            id="artist"
            name="artist"
            type="text"
            className={`form-control bg-dark text-light border-secondary ${
              errors.artist ? "is-invalid" : ""
            }`}
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onBlur={handleBlur}
            aria-describedby="artistError"
          />
          <div
            id="artistError"
            className="invalid-feedback d-block"
            aria-live="polite"
          >
            {errors.artist}
          </div>
        </div>

        {/* Right-aligned Add button */}
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary text-nowrap"
            disabled={!formValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
