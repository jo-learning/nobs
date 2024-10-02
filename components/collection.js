import Image from "next/image";
export default function Collection({
  imageSrc,
  productName,
  price,
  description,
}) {
  return (
     
        <div className="max-w-sm shadow-lg bg-gray-700">
          {/* Image Section */}
          <div className="bg-gray-300 m-3 mt-2 h-48 w-[230px] rounded-lg overflow-hidden">
            <Image
              // src='/images/1726327515832-3df0ffbd75b579c150bc0e4a1d54d6dfe8a24acd_180.jpg'// Image URL passed as prop
              src={imageSrc}
              alt="Card image"
              width={360}
              height={160}
              // layout="fill"
              // objectFit="cover"
              className=""
            />
          </div>

          {/* Horizontal Text Section */}
          <div className="p-6">
            <ul className="space-x-4 justify-center">
              <li className="text-gray-100 font-bold text-base">
                {productName}
              </li>
              <li className="text-gray-900 text-base m-0">{description}</li>
              <li className="text-gray-300 text-base m-0 ">{price}</li>
            </ul>
          </div>
       
      </div>
  );
}
