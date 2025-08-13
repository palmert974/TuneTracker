import NavBar from "./components/NavBar";
import TrackApp from "./components/TrackApp";

export default function App() {
  return (
    <div data-bs-theme="dark" className="bg-dark min-vh-100">
      <NavBar />
      <TrackApp />
    </div>
  );
}
