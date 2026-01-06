import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { ProjectDetail } from "./pages/project-detail";
import { MusicPlayer } from "./components/music-player";
import portfolioDataMain from "../portfolio-data.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
      <MusicPlayer playlistId={portfolioDataMain.music.youtubePlaylistId} />
    </BrowserRouter>
  );
}

export default App;
