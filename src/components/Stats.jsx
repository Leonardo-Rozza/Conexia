import { useEffect, useState } from "react";

export default function Stats() {
  // Estado inicial con valores por defecto para evitar errores
  const [stats, setStats] = useState({
    graduates: 0,
    companies: 0,
    institutions: 0,
    employability: 0
  });

  // Simulación de fetch de datos del backend
  useEffect(() => {
    // Aquí se puede reemplazar con axios o fetch al backend
    const fetchData = async () => {
      try {
        // Ejemplo de datos "reales" que vendrían del backend
        const data = {
          graduates: 5000,
          companies: 500,
          institutions: 50,
          employability: 85
        };
        setStats(data);
      } catch (error) {
        console.error("Error al cargar las estadísticas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-16 .bg-gradient-to-br from-amber-50/50 to-purple-50/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
<<<<<<< HEAD
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.graduates.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Egresados Registrados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.companies.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Empresas Aliadas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.institutions.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Instituciones Educativas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {stats.employability}%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Tasa de Empleabilidad</div>
=======
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5,000+</div>
            <div className="text-gray-600">Egresados Registrados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
            <div className="text-gray-600">Empresas Aliadas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
            <div className="text-gray-600">Instituciones Educativas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">85%</div>
            <div className="text-gray-600">Tasa de Empleabilidad</div>
>>>>>>> frontend
          </div>
        </div>
      </div>
    </div>
  );
}
