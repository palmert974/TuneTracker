import { useMemo, useState } from "react";
import TrackForm from "./TrackForm";
import TrackItem from "./TrackItem";

export default function TrackApp() {
  const [tracks, setTracks] = useState([]); // start empty
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null); // for highlight

  const visibleTracks = showOnlyFavorites
    ? tracks.filter((t) => t.favorite)
    : tracks;

  const favoriteCount = useMemo(
    () => tracks.filter((t) => t.favorite).length,
    [tracks]
  );

  function handleAddTrack({ title, artist }) {
    const id = crypto.randomUUID();
    const newTrack = { id, title, artist, favorite: false };
    setTracks((prev) => [...prev, newTrack]);
    setJustAddedId(id);
    setTimeout(() => setJustAddedId(null), 1200);
  }

  function handleToggleFavorite(id) {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    );
  }

  function handleDeleteTrack(id) {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container py-4">
      <TrackForm onAddTrack={handleAddTrack} />

      <div className="card bg-body-tertiary border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h3 m-0">Your Tracks</h2>

            {tracks.length > 0 && (
              <button
                className="btn btn-warning"
                onClick={() => setShowOnlyFavorites((v) => !v)}
              >
                {showOnlyFavorites ? "View all" : "Show favorites"}
              </button>
            )}
          </div>

          {visibleTracks.length > 0 ? (
            <ul className="list-group">
              {visibleTracks.map((track) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  isNew={track.id === justAddedId}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteTrack}
                />
              ))}
            </ul>
          ) : (
            <p className="text-muted m-0">
              {tracks.length === 0
                ? "Your TuneTracker is empty. Add a track above."
                : "No favorites yet."}
            </p>
          )}
        </div>
      </div>

      {favoriteCount > 0 && (
        <p className="text-muted mt-2">{favoriteCount} favorite(s)</p>
      )}
    </div>
  );
}
