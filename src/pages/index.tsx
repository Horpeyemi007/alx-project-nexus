import React, { useEffect, useState } from "react";
import Hero from "@/components/common/HeroPage";
import Feature from "@/components/common/Feature";
import Action from "@/components/common/Action";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Hero />
      <Feature />
      <Action />
    </div>
  );
};

export default Home;
