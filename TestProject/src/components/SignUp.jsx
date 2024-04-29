import  {React, useState} from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

function SignUp() {
  const [ username, setUserName ]= useState("");
  const [ email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

  const navigate=useNavigate()

  //submission work
  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3000/auth/signup", {
      username, email, password,
    }).then(response => {
      if(response.data.status){
      navigate('/login')}
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>

      <div className="bg-slate-900     w-full h-screen flex items-center justify-between ">
        {/* image div */}
        <div className=' w-[50%] h-screen hidden lg:block'>
          <img src="/src/assets/images/Medi.png" alt="img" className='w-full rounded h-full' />
        </div>

{/* form div */}
        <div className='container  border-2 bg-slate-900 border-myCustomColor rounded-md items-center justify-center  h-auto  lg:w-[50%] w-full mx-10 '>
          <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">SignUp</h2>
          <form className="flex p-4   flex-col  sm:flex-wrap gap-4 w-full" onSubmit={handleSubmit}>

            <div className="flex   flex-col  gap-4 w-full ">

              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-bold mb-2 text-base">UserName:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="UserName"
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow border-myCustomColor border-2  rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                />
              </div>

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

              <div className="mb-4 ">
                <label htmlFor="password" className="block text-white font-bold mb-2 text-base">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow border-myCustomColor border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="w-full   flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-myCustomColor w-full hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md "
                >
                  Sign Up
                </button>
              </div>

              <div className="w-full text-white   lg:flex justify-center mt-4">
                <p>Already have an account?</p><Link to="/login" className="text-blue-400 underline">Login Here</Link>
              </div>


            </div>
          </form>

        </div>

      </div>
    </>
  )
}

export default SignUp