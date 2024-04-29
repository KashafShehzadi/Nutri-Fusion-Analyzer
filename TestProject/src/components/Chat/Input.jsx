import React from "react";
import { RiSendPlane2Line, RiUserLine } from "react-icons/ri";

const Input = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent">
      <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 flex-row">
          
          {/* Input */}
          <div className="h-[8vh] flex flex-row justify-evenly w-72 pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
            <input
              tabIndex="0"
              data-id="root"
              rows="1"
              placeholder="Enter First Food"
              className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
            ></input>
</div>
  <div className="flex ml-2 flex-row justify-evenly w-72 pl-1 flex-grow  relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
            <input
              tabIndex="0"
              data-id="root"
              rows="1"
              placeholder="Enter Second Food"
              className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
            ></input>
</div>
          <div className="flex ml-2  flex-row justify-evenly w-full py-2 pl-1 flex-grow md:py-3 md:pl-4 relative   bg-transparent dark:border-gray-900/50 dark:text-white rounded-md border border-myCustomColor text-white">
          <input
              tabIndex="0"
              data-id="root"
              rows="1"
              placeholder="Additional context related to Food"
              className="w-full cursor-text resize-none  bg-transparent   focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none  overflow-y-hidden "
            ></input>
            <button className="absolute p-1 rounded-md text-myCustomColor bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-black">
              <RiSendPlane2Line />
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-100/50 md:px-4 md:pt-3 md:pb-6">
       
          Nutri-Fusion
       
        &nbsp;Created by KF teams
      </div>
    </div>
  );
};

export default Input;