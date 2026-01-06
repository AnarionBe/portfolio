import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { ProjectDetail } from "./pages/project-detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
