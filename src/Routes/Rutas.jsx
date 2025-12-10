import { useRoutes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Egresados from "../pages/Egresados";
import Empleadores from "../pages/Empleadores";
import Instituciones from "../pages/Instituciones";
import NoEncontrado from "../pages/NoEncontrado";

const Rutas = ({ user }) => {
  const rutas = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/Egresados", element: user?.type === "graduate" ? <Egresados /> : <LandingPage /> },
    { path: "/Empleadores", element: user?.type === "employer" ? <Empleadores /> : <LandingPage /> },
    { path: "/Instituciones", element: user?.type === "institution" ? <Instituciones /> : <LandingPage /> },
    { path: "*", element: <NoEncontrado /> },
  ]);

  return rutas;
};

export default Rutas;
<<<<<<< HEAD
=======



>>>>>>> frontend
