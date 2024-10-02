"use client";
import Categories from "@/components/category";
import Home from "@/components/home";
import Slider from "@/components/silder";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200 text-black">
      <Slider />

      <Home />
      <Categories />
    </div>
  );
}
