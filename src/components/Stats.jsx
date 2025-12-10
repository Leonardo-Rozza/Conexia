export default function Stats() {
  return (
    <div className="py-16 .bg-gradient-to-br from-amber-50/50 to-purple-50/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

