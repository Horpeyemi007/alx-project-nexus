import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Login to your account</h2>
        <p className="text-sm text-gray-300 mb-6">
          Welcome back! Stay connected and catch up with the latest feeds from
          your network.
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium"
        >
          Login
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
