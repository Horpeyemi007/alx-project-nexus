import React from "react";
import Link from "next/link";
import { SIGNUP_MUTATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { SignupInput, AuthResponse } from "@/types";

interface SignupData {
  signup: AuthResponse;
}

interface SignupVars {
  input: SignupInput;
}

export default function Signup() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupInput>({
    email: "",
    username: "",
    role: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  const [signup, { loading, error }] = useMutation<SignupData, SignupVars>(
    SIGNUP_MUTATION,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", data.signup.token);
        router.push("/dashboard");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate password match
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    // clear previous errors
    setFormError(null);
    signup({
      variables: {
        input: {
          email: formData.email,
          username: formData.username,
          bio: formData.bio,
          role: formData.role,
          password: formData.password,
        },
      },
    });
  };

  return (
    <div className="w-full p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Create your account</h2>
        <p className="text-sm text-white">
          Join today and start sharing your thoughts, discovering new
          communities, and engaging with real-time feeds.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="username" className="block text-sm mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="bio" className="block text-sm mb-1">
            Bio
          </label>
          <input
            id="bio"
            name="bio"
            type="text"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="role" className="block text-sm mb-1">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
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
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium"
        >
          Submit
        </button>
        {formError && <p className="text-red-500">{formError}</p>}
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
      <p className="text-xs text-white mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-white hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
