import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instituciones from "./pages/Instituciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/instituciones" element={<Instituciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
