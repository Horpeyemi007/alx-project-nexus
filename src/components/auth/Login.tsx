import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client/react";

import { LOGIN_MUTATION } from "@/graphql/mutations";
import { LoginInput, AuthResponse } from "@/types";

interface LoginData {
  login: AuthResponse;
}

interface LoginVars {
  input: LoginInput;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [login, { loading, error }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", data.login.token);
        router.push("/");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { input: formData } });
  };
  return (
    <div className="w-full p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Login to your account</h2>
        <p className="text-sm text-white mb-6">
          Welcome back! Stay connected and catch up with the latest feeds from
          your network.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>

      <p className="text-xs text-white mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
