import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instituciones from "./pages/Instituciones"; // <-- tu página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/instituciones" element={<Instituciones />} /> {/* ruta correcta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;





