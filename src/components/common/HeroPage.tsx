import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16">
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Stay Connected. <br /> Share Instantly. <br /> Discover More.
        </h1>
        <p className="text-lg">
          A dynamic social media platform where your feed updates in real time.
          Connect, share, and explore trending posts without missing a beat.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Image
          src="/images/hero-logo.png"
          alt="Social Feed Mockup"
          width={400}
          height={300}
          className="rounded-xl"
        />
      </div>
    </section>
  );
}
