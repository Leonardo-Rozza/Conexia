
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instituciones from "./pages/Instituciones"; // Tu página de instituciones

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Página principal */}
        <Route path="/instituciones" element={<Instituciones />} /> {/* Página a la que vamos después de login */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;




