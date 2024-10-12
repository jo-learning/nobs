"use client";
import Categories from "@/components/category";
import Home from "@/components/home";
import Slider from "@/components/silder";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(()=>{
    const cookies = async()=>{
      const res = await fetch('/api/setuser')
    }
    cookies();
  },[])
  return (
    <div className="min-h-screen bg-gray-200 text-black">
      <Slider />
      
      <Categories />
      <Home />
      
    </div>
  );
}
