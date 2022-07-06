import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import { IoMdAdd } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  const { removeUser } = useAuthStore();
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
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" /> {`  `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href={'/'}>
                <>
                  <Image
                    width={40}
                    height={40}
                    alt="profile"
                    src={userProfile.image}
                    className="rounded-full cursor-pointer"
                  />
                </>
              </Link>
            )}

            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              type="button"
              className="px-2"
            >
              <AiOutlineLogout color="red" className="text-xl" /> {`  `}
            </button>
          </div>
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
