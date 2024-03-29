import React from 'react';
import Logo from '../assests/Asset 2.png';
import Image from 'next/image';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block h-10 w-10 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-gray-700 align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
