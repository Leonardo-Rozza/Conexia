import { useRoutes } from "react-router";
import LandingPage from "../pages/LandingPage";
import Egresados from "../pages/Egresados";
import Empleadores from "../pages/Empleadores";
import Instituciones from "../pages/Instituciones";
import NoEncontrado from "../pages/NoEncontrado";

const Rutas = () => {
  const rutas = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/Egresados", element: <Egresados /> },
    { path: "/Empleadores", element: <Empleadores /> },
    { path: "/Instituciones", element: <Instituciones /> },
    { path: "*", element: <NoEncontrado /> },
  ]);

  return rutas;
};

export default Rutas;


