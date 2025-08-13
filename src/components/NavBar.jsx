import boombox from "../assets/boombox.svg";

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-3">
      <div className="container">
        <span className="navbar-brand d-flex align-items-center gap-2 mb-0">
          <img src={boombox} alt="" width="28" height="28" />
          <span className="fw-semibold">TuneTracker</span>
        </span>
      </div>
    </nav>
  );
}
