import heartPlus from "../assets/heart-plus.svg";
import heartMinus from "../assets/heart-minus.svg";
import xMark from "../assets/x-mark.svg";

export default function TrackItem({
  track,
  onToggleFavorite,
  onDelete,
  isNew,
}) {
  const base =
    "list-group-item d-flex align-items-center justify-content-between rounded-3";
  const tone = isNew
    ? " border border-success bg-success-subtle"
    : track.favorite
    ? " bg-primary-subtle"
    : " bg-dark-subtle";
  const itemClass = base + tone;

  return (
    <li className={itemClass}>
      <span className="fw-medium text-light">
        {track.title} <span className="text-secondary">- {track.artist}</span>
      </span>

      <div className="btn-group" role="group" aria-label="Actions">
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center"
          onClick={() => onToggleFavorite(track.id)}
          aria-label={track.favorite ? "Unfavorite" : "Favorite"}
        >
          <img
            src={track.favorite ? heartMinus : heartPlus}
            alt=""
            width="20"
            height="20"
          />
        </button>

        <button
          type="button"
          className="btn btn-danger d-flex align-items-center"
          onClick={() => onDelete(track.id)}
          aria-label="Delete"
        >
          <img src={xMark} alt="" width="20" height="20" />
        </button>
      </div>
    </li>
  );
}
