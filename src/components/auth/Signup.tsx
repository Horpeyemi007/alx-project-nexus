import React from "react";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="w-full p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Create your account</h2>
        <p className="text-sm text-gray-400">
          Join today and start sharing your thoughts, discovering new
          communities, and engaging with real-time feeds.
        </p>
      </div>
      <form>
        <div className="mb-2">
          <label htmlFor="firstName" className="block text-sm mb-1">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block text-sm mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
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

        <div className="mb-2">
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

        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block text-sm mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-white hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
