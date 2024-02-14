import PokeBall from "./pokeball";
import '../styles/loadingScreen.css'

export default function LoadingScreen(props) {
  return (
    <div className="loading-overlay">
      <PokeBall></PokeBall>
      <p className="loading-info-text">Loading Pokemon</p>
    </div>
  );
}
