'use client';

import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Page() {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: 'test@test.com',
      password: 'abc',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setShowError(false);

    const apiResponse = await apiCaller.sessions.logIn({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    if (apiResponse.ok) {
      location.href = constants.pages.tenants();
      return;
    }

    setShowError(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Info */}
      <div className="flex-1 bg-linear-to-br from-blue-600 to-purple-700 p-12 flex flex-col justify-center text-white">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">Welcome back</h1>
          <p className="text-lg text-blue-100">
            Sign in to your account to access all the features of our platform. Manage your projects, collaborate with your team, and take your productivity to the next level.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {showError && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <CircleAlert />
                Incorrect username or password. Please try again.
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                {...register('email', {
                  pattern: {
                    message: 'Invalid email address',
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                  required: 'Email is required',
                })}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl">
              Sign In
            </button>

            {/* Forgot Password */}
            {/* 
            <div className="text-center">
              <a className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </a>
            </div> 
            */}
          </form>
        </div>
      </div>
    </div>
  );
}
