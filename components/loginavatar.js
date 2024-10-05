import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '@/store/userSlice';
import Image from 'next/image';

const LoginAvatar = ({ name, avatarUrl, handlelogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()
  const usercheck = useSelector((state)=> state.user.role)

  useEffect(()=>{
    const Role = localStorage.getItem("role");
    if (Role){
      dispatch(setRole(JSON.parse(Role)))
    }
  },[]);
  function decodeJWT(token) {
    const [header, payload] = token.split('.');
  
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
  
    // console.log('Header:', decodedHeader);
    // console.log('Payload:', decodedPayload);
    return decodedPayload
    
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen){
      const Role = localStorage.getItem("role");
      console.log(Role)
    if (Role){
      dispatch(setRole(JSON.parse(Role)))
    }
    }
  };

  return (
    <div className="relative inline-block text-left">
      {
        usercheck == 'user' && (
          <div className="flex flex-row items-center justify-center bg-gray-100 bottom-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer" onClick={toggleDropdown}>
          <Image src={avatarUrl} alt={`${name}'s Avatar`} className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800 hidden sm:flex">{name}</h2>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-[200px] w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <a
              href="profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Profile
            </a>
            <a
              href="settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Settings
            </a>
            <a
             onClick={()=> {handlelogout(); setIsOpen(false);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </a>
          </div>
        )}
      </div>
        )
      }
      {
        usercheck == 'admin' && (
          <div className="flex flex-row items-center justify-center bg-gray-100 bottom-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer" onClick={toggleDropdown}>
          <Image src={avatarUrl} alt={`${name}'s Avatar`} className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800 hidden sm:flex">{name}</h2>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-[200px] w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <a
              href="profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Profile
            </a>
            <a
              href="dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard
            </a>
            <a
              href="settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Settings
            </a>
            <a
             onClick={()=> {handlelogout(); setIsOpen(false);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </a>
          </div>
        )}
      </div>
        )
      }
      {
        usercheck == 'provider' && (
          <div className="flex flex-row items-center justify-center bg-gray-100 bottom-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer" onClick={toggleDropdown}>
          <Image src={avatarUrl} alt={`${name}'s Avatar`} className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800 hidden sm:flex">{name}</h2>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-[200px] w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <a
              href="#profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Profile
            </a>
            <a
              href="dashboardprovider"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard
            </a>
            <a
              href="settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Settings
            </a>
            <a
             onClick={()=> {handlelogout(); setIsOpen(false);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </a>
          </div>
        )}
      </div>
        )
      }
    </div>
  );
};

export default LoginAvatar;
