'use client'
import Layout from '../../../components/layout';
import UserList from '@/components/userlist';
import cookie from 'cookie';

export default function Setting(){
    return (
        <Layout>
            <UserList />
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

// Mock user fetching logic based on authToken
const user = { id: cookies.authToken };
// const user = { id: cookies.authToken, role: cookies.role };

return {
  props: { user }, // Pass user data to the dashboard
};
}