import React from 'react'

function Pairing() {
  return (

    <>
      <div className='z-10 bg-slate-900 w-full h-auto items-center' id="pair">
        <div className='px-4 items-center   text-center'>

          <div className='items-center'>
            <h1 className='text-myCustomColor items-center pt-28 text-xl  lg:text-3xl font-bold '>Food Pairing matter alot,How?</h1>
          </div>


          <div class="grid grid-cols-1 px-4 text-white md:grid-cols-3 gap-4">
            {/* 1st Card  */}
            <div class="bg-transparent border-myCustomColor border-2 hover:shadow-myCustomColor hover:scale-105 rounded-lg shadow-md h-auto mt-9 ">
              <h4 class="mt-2 text-lg lg:text-xl lg:font-bold"> Digestive Health</h4>
              <p class="mt-2 pt-0 p-4 ">Well-paired meals can help prevent discomfort, bloating, and indigestion</p>

              <div class="w-full flex items-center justify-center mb-2">
                <img src="/src/assets/images/fish.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white">Milk and Fish&#x274C;</span>
              </div>

              <div class="w-full flex items-center justify-center mb-2">
                <span class="text-white"> &#x274C;Mint & Aerated drinks </span>
                <img src="/src/assets/images/mint.png" alt="Image 2" class="lg:w-52 lg:h-32 w-36 h-36 rounded " /></div>

              <div class="w-full flex items-center  justify-center">
                <img src="/src/assets/images/tea.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white">Tea and Yougurt &#x274C;</span>
              </div>
            </div>
            {/* second Card */}
            <div class="  border-myCustomColor border-2 hover:shadow-myCustomColor hover:scale-105 rounded-lg shadow-md h-auto mt-9">
              <h4 class="mt-2 text-lg lg:text-xl  md:font-bold">Enhanced Flavor and Palatability</h4>
              <p class="mt-2  pt-0 p-4">Well-paired foods with best flavors and unique textures gives enjoyable dining experience.</p>

              <div class="w-full flex items-center  justify-center mb-2">
                <img src="/src/assets/images/flaver.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white">Dominant flavors </span>
              </div>

              <div class="w-full flex items-center justify-center mb-2">
                <span class="text-white">Elevated Dining Experience</span>
                <img src="/src/assets/images/Whole.jpeg" alt="Image 2" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
              </div>

              <div class="w-full flex items-center justify-center">
                <img src="/src/assets/images/taste.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white">Balance tastes</span></div>

            </div>
            {/* third */}
            <div class="  border-myCustomColor border-2 hover:shadow-myCustomColor hover:scale-105 rounded-lg shadow-md h-auto mt-9">
              <h4 class="mt-2 text-lg lg:text-xl  md:font-bold">Mindful Eating Practices:</h4>
              <p class="mt-2  pt-0 p-4">By Mindful eating you can get valuable insights into your health,food, and overall well-being.</p>

              <div class="w-full flex items-center justify-center mb-2">
                <img src="/src/assets/images/Nut.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white">Nutrient tracking </span>
              </div>

              <div class="w-full flex items-center justify-center mb-2">
                <span class="text-white ">Allergy and sensitivity awareness</span>
                <img src="/src/assets/images/Allergy.jpg" alt="Image 2" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
              </div>

              <div class="w-full flex items-center  justify-center">
                <img src="/src/assets/images/portion.png" alt="Image 3" class="lg:w-52 lg:h-32 w-36 h-36 rounded " />
                <span class="text-white ">Portion control</span></div>

            </div>
            
           
            


          </div></div>
      </div>
    </>
  )
}

export default Pairing