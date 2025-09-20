import React from "react";
import { useRouter } from "next/router";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

const Auth: React.FC = () => {
  const router = useRouter();
  const { type } = router.query;
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#FD4E6E] rounded-lg shadow overflow-hidden">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-6">
          {type === "login" && <Login />}
          {type === "signup" && <Signup />}
        </div>

        {/* Right Illustration Section */}
        <div className="hidden md:flex md:w-1/2 bg-background items-center justify-center text-center p-6 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-2">Join the Conversation</h2>
            <p className="text-sm text-orange-500 max-w-xs mx-auto">
              Share your thoughts, connect with friends, and explore trending
              topics in real time
            </p>
            <div className="mt-4">
              <span className="block text-sm">
                ✨ Create and share dynamic posts
              </span>
              <span className="block text-sm">
                🌍 Discover trending content globally
              </span>
              <span className="block text-sm">
                💬 Chat and engage with communities
              </span>
              <span className="block text-sm">
                🔔 Stay updated with real-time feeds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
