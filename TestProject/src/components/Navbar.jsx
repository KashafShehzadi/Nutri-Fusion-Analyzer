import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const headerRef = useRef(null);
  const [click, setClick] = useState(false);
  const [nav, setNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogOut = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      }).catch(err => {
        console.log(err);
      });
  };

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const headerElement = headerRef.current;
    const windowElement = window;
    function handleScroll() {
      const scrollPosition = windowElement.scrollY;
      const backgroundColor = scrollPosition > 0 ? 'black' : 'transparent';
      headerElement.style.backgroundColor = backgroundColor;
    }

    windowElement.addEventListener('scroll', handleScroll);

    const cleanup = () => {
      windowElement.removeEventListener('scroll', handleScroll);
    };

    return cleanup;
  }, []);

  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    axios.get('http://localhost:3000/auth/userInfo')
      .then(res => {
        setUserInfo(res.data.userInfo);
      }).catch(err => {
        console.log(err);
      });
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
    setErrorMessage(''); // Clear error message when closing the edit profile
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    axios.put('http://localhost:3000/auth/updateProfile', { username, password })
      .then(res => {
        if (res.data.status) {
          setShowEditProfile(false);
          setUsername('');
          setPassword('');
          setErrorMessage(''); // Clear error message on successful submission
          window.alert(res.data.message);
          fetchUserInfo();
        } else {
          // Handle error
        }
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <header className="z-30 bg-transparent md:fixed absolute  w-full" ref={headerRef}>
      <nav className="flex justify-between items-center w-[92%]  h-16 mx-auto">
        <div className='flex lg:text-3xl md:text-xl w-90  font-bold  border-myCustomColor border-b-4 rounded-xl'>
          <h1 className=" text-myCustomColor">N</h1>
          <h1 className=" text-textColor">utri-</h1>
          <h1 className=" text-myCustomColor">F</h1>
          <h1 className=" text-textColor">usion</h1>
        </div>
        <div className="hidden md:flex md:flex-row md:items-center ml-28  text-white lg:text-lg md:text-sm font-semibold ">
          <ul className={click ? "active flex md:flex-row md:items-center  md:gap-[2vw] lg:gap-[4vw] " : " flex md:flex-row md:items-center  md:gap-[2vw] lg:gap-[4vw] "}>
            <li><Link className="  cursor-pointer" to="Home" smooth={true} spy={true} offset={0} duration={500}>Home</Link></li>
            <li><Link className=" cursor-pointer" to="pair" smooth={true} spy={true} offset={0} duration={500}>Pairings</Link></li>
            <li><Link className=" cursor-pointer" to="nutrition" smooth={true} spy={true} offset={0} duration={500}>Nutrition</Link></li>
            <li><Link className="  cursor-pointer" to="Working" smooth={true} spy={true} offset={0} duration={500}>Working</Link></li>
            <li><Link className=" cursor-pointer" to="contact" smooth={true} spy={true} offset={0} duration={500}>Contact</Link></li>
          </ul>
        </div>
        <NavLink className="bg-myCustomColor text-white px-3 py-2 ml-24 text-sm lg:px-5 lg:py-2 lg:font-semibold rounded-md hover:bg-[white] hover:text-myCustomColor" to="/chat">Try Chatbot</NavLink>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="relative">
            <FaUserCircle size={40} style={{ color: '#f57402' }} onClick={handleUserMenu} className="cursor-pointer text-white" />
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-myCustomColor text-black rounded-md shadow-md z-10">
                <h4 className=' text-center '>User Profile</h4>
                <ul className="py-2 px-3 ">
                  <li className="cursor-pointer py-1 mb-2">Username: {userInfo?.username}</li>
                  <li className="cursor-pointer py-1  mb-2">Email: {userInfo?.email}</li>
                  <button className="cursor-pointer py-1 mb-2  bg-myCustomColor rounded px-2" onClick={handleEditProfile}>Edit Profile</button>
                  <Link onClick={handleLogOut} className="cursor-pointer py-1 bg-myCustomColor rounded px-2 ml-3">Logout</Link>
                </ul>
              </div>
            )}
          </div>
        </div>

        {showEditProfile && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleEditProfileSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full"  required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required/>
                  {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                </div>
                <div className="flex justify-end">
                  <button type="submit" className=" bg-myCustomColor text-white px-4 py-2 rounded-md mr-2">Save Changes</button>
                  <button type="button" onClick={handleCloseEditProfile} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex items-center  space-x-4 lg:space-x-6">
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
