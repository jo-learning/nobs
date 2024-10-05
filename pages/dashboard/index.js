'use client'
import { setUser } from '@/store/userSlice';
import Layout from '../../components/layout';
import cookie from 'cookie';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);
  useEffect(() => {
    
    // function decodeJWT(token) {
    //   const [header, payload] = token.split('.');
    
    //   const decodedHeader = JSON.parse(atob(header));
    //   const decodedPayload = JSON.parse(atob(payload));
    
    //   console.log('Header:', decodedHeader);
    //   console.log('Payload:', decodedPayload);
    //   dispatch(setUser(decodedPayload));
      
    // }
    // decodeJWT(user.id)
  },[])
  return (
    <Layout>
      <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>

        {/* Metric Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">New Sales</h3>
          <p className="text-3xl font-bold">$12,345</p>
        </div>

        {/* Metric Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-3xl font-bold">45</p>
        </div>

        {/* More Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Tasks Completed</h3>
          <p className="text-3xl font-bold">678</p>
        </div>
      </div>
    </Layout>
  );
}

function decodeJWT(token) {
      const [header, payload] = token.split('.');
    
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));
    
      // console.log('Header:', decodedHeader);
      // console.log('Payload:', decodedPayload);
      return decodedPayload
      
    }
    // decodeJWT(user.id)

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  // Check if the authToken exists
  // if (!cookies.authToken || cookies.role !== 'admin') {
  // console.log(cookies.role);
  // console.log(decodeJWT(cookies.authToken))
 
    if (!cookies.authToken ) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const usercheck = decodeJWT(cookies.authToken)
  if (usercheck.role == 'user'){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  else if (usercheck.role == 'provider'){
    return {
      redirect: {
        destination: '/dashboardprovider',
        permanent: false,
      },
    };
  }

  // Mock user fetching logic based on authToken
  const user = { id: cookies.authToken };
  // const user = { id: cookies.authToken, role: cookies.role };

  return {
    props: { user }, // Pass user data to the dashboard
  };
}