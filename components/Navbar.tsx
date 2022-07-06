import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();

  return (
    <div
      className="w-full flex justify-between items-center 
     border-b-2 border-gray-200 py-2 px-4"
    >
      <Link href="/">
        <div className="w-[100px] md:w-[129px] ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
      <div>GoogleLogin</div>
      <div>
        {userProfile ? (
          <div>user already logged in</div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => {
              createOrGetUser(res, addUser);
            }}
            onError={() => {
              console.log('error');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
