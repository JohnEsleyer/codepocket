
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";

import Hero from "./_components/Hero";


 const Home: React.FC = () => {

  return (
      <div>
      <Hero/>

      </div>
  );
}

export default Home;
