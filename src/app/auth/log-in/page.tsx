'use client';

import { useForm } from 'react-hook-form';
import api from '@/app/api';
import constants from '@/config/constants';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const apiResponse = await api.auth.logIn({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    if (apiResponse.ok) {
      location.href = constants.pages.tenants();
      return;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Info */}
      <div className="flex-1 bg-linear-to-br from-blue-600 to-purple-700 p-12 flex flex-col justify-center text-white">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">Bienvenido de vuelta</h1>
          <p className="text-lg text-blue-100">
            Ingresa a tu cuenta para acceder a todas las funcionalidades de nuestra plataforma. Gestiona tus proyectos,
            colabora con tu equipo y lleva tu productividad al siguiente nivel.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                {...register('email', {
                  required: 'El correo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido',
                  },
                })}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                {...register('password', {
                  required: 'La contraseña es requerida',
                })}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
