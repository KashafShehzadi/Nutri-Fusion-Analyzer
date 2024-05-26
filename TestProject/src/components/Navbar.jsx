import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios'
function Navbar() {
  const headerRef = useRef(null);
  const [click, setClick] = useState(false)
  const [nav, setNav] = useState(false);

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
  const handleNav = () => {
    setNav(!nav);
  };
  //bg-changer for headr
  useEffect(() => {
    const headerElement = headerRef.current;
    const windowElement = window;
    function handleScroll() {
      const scrollPosition = windowElement.scrollY;
      const backgroundColor = scrollPosition > 0 ? 'black' : 'transparent';
      headerElement.style.backgroundColor = backgroundColor;
    }

   

    windowElement.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    const cleanup = () => {
      windowElement.removeEventListener('scroll', handleScroll);
    };

    return cleanup;
  }, []);
  // const closeMenu=()=>setNav(false)
  return (
    <header className="z-30 bg-transparent md:fixed absolute  w-full" ref={headerRef}>
      <nav className="flex justify-between items-center w-[92%]  h-16 mx-auto">

        <div className='flex lg:text-3xl md:text-xl w-90  font-bold  border-myCustomColor border-b-4 rounded-xl'>
          <h1 className=" text-myCustomColor">N</h1>
          <h1 className=" text-textColor">utri-</h1>
          <h1 className=" text-myCustomColor">F</h1>
          <h1 className=" text-textColor">usion</h1>
        </div>

        <div className="hidden md:flex md:flex-row md:items-center text-white lg:text-lg md:text-sm font-semibold ">
          <ul className={click ? "active flex md:flex-row md:items-center  md:gap-[2vw] lg:gap-[4vw] " : " flex md:flex-row md:items-center  md:gap-[2vw] lg:gap-[4vw] "}>
            <li><Link className="  cursor-pointer" to="Home" smooth={true} spy={true} offset={0} duration={500}>Home</Link></li>
            <li><Link className=" cursor-pointer" to="pair" smooth={true} spy={true} offset={0} duration={500}>Pairings</Link></li>
            <li><Link className=" cursor-pointer" to="nutrition" smooth={true} spy={true} offset={0} duration={500}>Nutrition</Link></li>


            <li><Link className="  cursor-pointer" to="Working" smooth={true} spy={true} offset={0} duration={500}>Working</Link></li>
            <li><Link className=" cursor-pointer" to="contact" smooth={true} spy={true} offset={0} duration={500}>Contact</Link></li>
          </ul>
        </div>

        <div className="flex items-center  space-x-4 lg:space-x-6">
          <button className="bg-myCustomColor text-white px-3 py-2 lg:px-5 lg:py-2 lg:font-semibold text-sm rounded-md hover:bg-[white] hover:text-myCustomColor" onClick={handleLogOut}>LogOut</button>
          <NavLink className="bg-myCustomColor text-white px-3 py-2 text-sm lg:px-5 lg:py-2 lg:font-semibold rounded-md hover:bg-[white] hover:text-myCustomColor" to="/chat">Try Chatbot</NavLink>
          <div onClick={handleNav} className="text-white block md:hidden">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            {nav && (
              <ul className="text-white md:hidden fixed top-20 w-[80%] md:w-[30%] h-auto rounded-md border-r border-white bg-black ease-in-out duration-500 z-50 right-[0]">
                <li className="p-4 border-b border-gray-600"><Link className="hover:text-myCustomColor" to="Home" smooth={true} spy={true} offset={0} duration={500}>Home</Link></li>
                <li className="p-4 border-b border-gray-600"><Link className="hover:text-myCustomColor" to="pair" smooth={true} spy={true} offset={0} duration={500}>Pairings</Link></li>
                <li className="p-4 border-b border-gray-600"><Link className="hover:text-myCustomColor" to="nutrition" smooth={true} spy={true} offset={0} duration={500}>Nutrition</Link></li>
                <li className="p-4 border-b border-gray-600"><Link className="hover:text-myCustomColor" to="Working" smooth={true} spy={true} offset={0} duration={500}>Working</Link></li>
                <li className="p-4"><Link className="hover:text-myCustomColor" to="contact" smooth={true} spy={true} offset={0} duration={500}>Contact</Link></li>
              </ul>
            )}
          </div>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
