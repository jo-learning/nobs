import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import en from '../locales/en/common.json';
import ti from '../locales/ti/common.json';

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setcategory] = useState([])
  const { locale } = useRouter();
  const translations = locale === 'en' ? en : ti;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown1 = () => {
      setIsOpen(true)
  }

//   const categories = ['Technology', 'Health', 'Finance', 'Education', 'Sports'];


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/category/allcategory");
        const data = await res.json();
        if (res.ok) {
          const newdata = data.allCategory;
        //   console.log(newdata);
          setcategory(newdata);
        } else {
          toast.error("0 products are there");
        }
      } catch {
        toast.error("Connection Error");
      }
    };
    fetchProduct();
  }, []);

  return (
    <div  onMouseEnter={toggleDropdown1} className="relative inline-block text-left">
      <button
        className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {translations.categories}
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" onMouseEnter={toggleDropdown1} onMouseLeave={toggleDropdown}>
            {categories.map((category, index) => (
              <a
                key={index}
                href={`/products/${category.name_en}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {locale === 'en' ? category.name_en: category.name_tg}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
