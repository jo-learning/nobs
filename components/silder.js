// import Swiper from "swiper";
// import Image from "next/image";
// import { useEffect } from "react";
// export default function Slider() {
//   useEffect(() => {
//     new Swiper(".swiper-container", {
//       pagination: {
//         el: ".swiper-pagination",
//       },
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//     });
//   }, []);

//   return (
//     <div className="swiper-container relative overflow-hidden">
//       <div className="swiper-wrapper">
//         <div className="swiper-slide relative">
//           {/* <img src="/images/your-image-url.jpg" alt="Slide 1" className="w-full h-auto object-cover" /> */}
//           <Image
//             src="/images/images.jpeg" // Path to the image in the public directory
//             alt="Example Image"
//             width={1500} // Desired width
//             height={800} // Desired height
//             // layout="fill"
//             // objectFit="cover"
//             className="w-ful h-8 rounded-lg shadow-lg" // Optional Tailwind CSS classes
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center text-white p-4 md:p-8">
//             <div>
//               <h2 className="text-xl md:text-3xl font-bold mb-4">
//                 Your Text Here
//               </h2>
//               <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
//                 Your Button
//               </button>
//             </div>
//           </div>
//         </div>

        
//         {/* Add more swiper-slide items as needed */}
//       </div>
//       {/* Swiper Pagination */}
//       <div className="swiper-pagination"></div>
//       {/* Swiper Navigation */}
//       <div className="swiper-button-next"></div>
//       <div className="swiper-button-prev"></div>
//     </div>
//   );
// }







import Image from 'next/image';
import { useState, useEffect } from 'react';

const Slider = () => {
  // List of images and their corresponding text
  const slides = [
    {
      image: '/images/images.jpeg',
      text: 'Shop the Latest Trends! 🌟 Explore Our New Arrivals!',
    },
    {
      image: '/images/images 1.webp',
      text: 'Unleash Your Style! 👗 Find Your Perfect Outfit Today!',
    },
    {
      image: '/images/ecommerce.png',
      text: 'Big Savings Await! 🛒 Don\'t Miss Our Exclusive Deals!',
    },
  ];

  // State to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set an interval to change slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Clear the interval when component unmounts
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Image */}
          <Image 
            src={slide.image}
            alt={slide.text}
            width={1500} // Fixed width for now
            height={500} // You can adjust this based on the image
            className="object-cover w-full h-full" // Ensure image covers the entire container
          />

          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-white text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-7">
              {slide.text}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
