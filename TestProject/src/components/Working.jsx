import React from 'react'

function Working() {
  return (
    <>
    
   
    <div  className='z-10 bg-slate-900 w-full h-auto items-center' id="Working">  
    <div className='px-4 items-center  text-center'>
      
     <div className='items-center'>
     <h1 className='text-myCustomColor items-center pt-28 text-xl  md:text-3xl font-bold '>How Nutri-Fusion Works</h1>

     </div>
      
      
  <div class="grid grid-cols-1 px-4  md:grid-cols-4 gap-4">

    <div class="bg-white  border-myCustomColor border-y-4 hover:shadow-white hover:scale-105 rounded-lg shadow-md h-96 mt-9">
      <h4 class="mt-2 text-lg lg:text-xl md:font-bold"> Effortless Input</h4>
      <img src="/src/assets/images/Chatbot.png" alt="Image 1" class=" w-full lg:h-48 h-28 mt-2 rounded"/>
      <p class="mt-2 pt-0 lg:p-4 text-black"> No need for long prompts or complex queries, simply input your food pair to get started.</p>
    </div>
    <div class="bg-white  border-myCustomColor  hover:shadow-white hover:scale-105   scal border-y-4 rounded-lg shadow-md h-96 mt-9">
      <h4 class="mt-2 text-lg lg:text-xl md:font-bold"> Data Collection</h4>
      <img src="/src/assets/images/Data.jpg" alt="Image 1" class=" w-full lg:h-48 h-28 mt-2 rounded"/>
      <p class="mt-2  pt-0 lg:p-4  text-black">Our data include essential nutrients, vitamins, and other associated synergies and potential pitfalls  crucial for assessing the overall nutritional value.</p>
    </div>
    <div class="bg-white  border-myCustomColor border-y-4 hover:shadow-white hover:scale-105 rounded-lg shadow-md h-96 mt-9">
      <h4 class="mt-2 text-lg lg:text-xl md:font-bold"> Large Language Models</h4>
      <img src="/src/assets/images/LLM.png" alt="Image 1" class=" w-full lg:h-48 h-28 mt-2 rounded"/>
      <p class="mt-2  lg:p-4 text-[15px] pt-0 text-black">With advanced linguistic understanding,Our Chatbot interprets and extracts meaningful and accurate insights from the gathered data</p>
    </div>
    <div class="bg-white  border-myCustomColor border-y-4  hover:shadow-white hover:scale-105 rounded-lg shadow-md h-96 mt-9">
      <h4 class="mt-2 text-lg lg:text-xl md:font-bold">Intelligible Output</h4>
      <img src="/src/assets/images/Health1.png" alt="Image 1" class=" w-full lg:h-52 h-28 mt-1 rounded"/>
      <p class=" lg:p-4 pt-0 text-black">Visualize your nutritional breakdown in a captivating and easy-to-understand format,easily grasped by the audience</p>
    </div>

  </div></div>
  </div>  
  
  </>
  )
}

export default Working