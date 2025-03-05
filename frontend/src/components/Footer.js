import React from 'react'
import { MdCopyright } from "react-icons/md";
const Footer = () => {
  return (
      <footer className='bg-slate-200'>
          <div className='container mx-auto p-4 flex justify-center items-center'>
              <p className='text-center font-bold flex items-center' title="Youtube Channel">
                  Copyright <MdCopyright className="ml-1" /> Liberation War Museum
              </p>
          </div>
      </footer>
  );
};

export default Footer