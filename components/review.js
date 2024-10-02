import { useEffect, useState } from "react";

export default function Review({name, message, stars}){
    let star = ""
    let counter = 0;
        while (stars !== counter){
            // setStar(prev => prev + "⭐")
            star = star + "⭐";
            counter++;
        }
    
    return (
        <>
        <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-600">{star}</p>
              <p className="text-gray-700 mt-2">
                {message}
              </p>
            </div>
        </>
    );
}