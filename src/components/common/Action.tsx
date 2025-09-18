import React from "react";
import Link from "next/link";

export default function Action() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Join the Conversation?
      </h2>
      <p className="mb-8">
        Sign up today and start sharing your voice in the dynamic social feed.
      </p>
      <Link
        href="/auth/signup"
        className="bg-white text-blue-700 px-8 py-3 rounded font-semibold hover:bg-blue-100 transition"
      >
        Get Started for Free
      </Link>
    </section>
  );
}
