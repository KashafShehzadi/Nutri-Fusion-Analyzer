import axios from 'axios'
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Dummy() {
const navigate=useNavigate()
axios.defaults.withCredentials=true;
const handleLogOut=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(res=>{
      if(res.data.status){  
navigate('/login')
      }
    }).catch(err =>{
      console.log(err)
    })
  }
  return (
    <>


    <div className='items-center text-white flex flex-col text-center justify-center'>
<Link to='/dash' className='text-black'>Dashboard</Link>
    <br></br>
    <button className='w-full bg-slate-600' onClick={handleLogOut}>Logout</button></div>
    </>

  )
}

export default Dummy