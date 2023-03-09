import React from 'react';
import Logo from '../assests/Asset 2.png';
import Image from 'next/image';
import Spinner from './Base/Spinner';

const LoadingPage = () => {
  return (
    <div className="w-full py-auto h-screen apply-gradient flex flex-col justify-center">
      {/* Show the logo with a spinner at the center of the screen */}

      <div className="scale-75 mx-auto">
        <Image src={Logo} alt="Logo" />
      </div>
      <Spinner />
    </div>
  );
};

export default LoadingPage;
