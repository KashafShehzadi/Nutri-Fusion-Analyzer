import React, { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

function Forget() {

    
    const [ email, setEmail ] = useState("");
    
  
    const navigate=useNavigate()
  
    //submission work
    const handleSubmit = (e) => {
      e.preventDefault()
      Axios.post("http://localhost:3000/auth/forgot", {
        email
      }).then(response => {
        if(response.data.status){
            alert("Check your Email for further instructions"); 
        navigate('/login')}
      }).catch(err => {
        console.log(err)
      })
    }
  
  return (
    <>
     <div className="bg-slate-900 w-full h-screen flex items-center justify-center ">
      <div className='container  border-2  bg-slate-900 border-myCustomColor rounded-md items-center justify-center  h-auto  lg:w-[50%] w-full mx-10 '>
          <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">Forget Password</h2>
          <form className="flex p-4    flex-col  sm:flex-wrap gap-4 w-full" onSubmit={handleSubmit}>

            <div className="flex   flex-col  gap-4 w-full ">

              <div className="mb-4 ">
                <label htmlFor="email" className="block text-white font-bold mb-2 text-base">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc123@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow border-myCustomColor border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="w-full   flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-myCustomColor w-full hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md "
                >
                  Send  Reset Link
                </button>
                
              </div>

            </div>
          </form>

        </div>
        
        

      </div>
    </>
  )
}

export default Forget