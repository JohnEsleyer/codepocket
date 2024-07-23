
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";
import Header from "./_components/Header";
import Main from "./_components/Main";
import Footer from "./_components/Footer";


 const Home: React.FC = () => {

  return (
    


      <Main />

  );
}

export default Home;
