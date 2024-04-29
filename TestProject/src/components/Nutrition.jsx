import React from 'react';

function Nutrition() {
  return (
    <>
      <div className="bg-slate-900 h-auto items-center justify-center" id="nutrition">
        <h1 className="text-center  text-lg font-bold text-myCustomColor lg:text-3xl pt-28">
          Nutrition Check & Balance
        </h1>

        <div className="flex flex-col md:flex-row justify-center lg:mt-10 mt-7 w-full">

          <div className="flex flex-col items-center justify-center w-full lg:w-1/3 px-4">

            <div className="border-white   border-2 px-1 py-4 overflow-hidden rounded-full mt-10">
              <div className="bg-white rounded-full lg:w-64 lg:h-64 w-52 h-52 mx-4">
                <img src="/src/assets/images/Nutri.png" alt="Image 1" className="w-full h-full  hover:scale-105 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center  w-full md:w-1/2 ">
            <h2 className="text-white text-[15px] hover:border-myCustomColor  hover:scale-105 border-t-2 border-l-2 border-white lg:font-semibold mt-7 lg:text-2xl  ">Identify Nutrient-rich food Pairs</h2>
            <h2 className="text-white text-[15px]  hover:scale-105 hover:border-myCustomColor border-b-2 border-r-2  border-white  font-semibold mt-12 lg:text-2xl lg:ml-44 ">Describe Nutrient Insights</h2>

            <h2 className="text-white text-[15px]  hover:scale-105 hover:border-myCustomColor border-t-2 border-l-2 border-white font-semibold mt-12 lg:text-2xl">
              Tells right proportion of foods
            </h2>
            <h2 className="text-white text-[15px]  hover:scale-105 hover:border-myCustomColor border-b-2 border-r-2 border-white font-semibold mt-12 lg:text-2xl lg:ml-44 ">
              Tells Right Time for Intake
            </h2>
            <h2 className="text-white text-[15px]  hover:scale-105  hover:border-myCustomColor border-t-2 border-l-2 border-white font-semibold mt-12 lg:text-2xl">
              Provide Long-Term user Wellness
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center w-full lg:w-1/3 px-4">
            <div className="border-white border-2 overflow-hidden rounded-full px-1 py-4 mt-10">
              <div className="bg-white rounded-full lg:w-64 lg:h-64 w-52 h-52 mx-4">
                <img src="/src/assets/images/Chart.png" alt="Image 1" className="w-full h-full  hover:scale-105 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nutrition;
