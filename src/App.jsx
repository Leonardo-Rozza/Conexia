import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
<<<<<<< HEAD
import Instituciones from "./pages/Instituciones";
=======
import Instituciones from "./pages/Instituciones"; // <-- tu página
import Empleadores from "./pages/Empleadores";
>>>>>>> frontend

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
        <Route path="/instituciones" element={<Instituciones />} />
=======
        <Route path="/Empleadores" element={<Empleadores />} />
        <Route path="/instituciones" element={<Instituciones />} /> {/* ruta correcta */}
>>>>>>> frontend
      </Routes>
    </BrowserRouter>
  );
}

export default App;
