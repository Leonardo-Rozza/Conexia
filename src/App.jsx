import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instituciones from "./pages/Instituciones"; // <-- tu página
import Empleadores from "./pages/Empleadores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Empleadores" element={<Empleadores />} />
        <Route path="/instituciones" element={<Instituciones />} /> {/* ruta correcta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
