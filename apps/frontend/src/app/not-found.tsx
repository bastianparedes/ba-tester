import { Home } from 'lucide-react';
import constants from '@/config/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Número 404 grande */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">
            404
          </h1>
          <div className="h-1 w-32 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Mensaje principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra
          ubicación.
        </p>

        {/* Botón de acción */}
        <div className="flex justify-center">
          <a
            href={constants.pages.home()}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
