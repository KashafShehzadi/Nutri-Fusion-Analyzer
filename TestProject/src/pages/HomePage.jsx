import React, { useRef, useState,useEffect } from 'react';
import  {useNavigate}  from 'react-router-dom';
import axios from 'axios'

import Navbar from '../components/Navbar'
import Working from '../components/Working';
import Home from '../components/Home';
import Nutrition from '../components/Nutrition';

import Contact from '../components/Contact';
import Pairing from '../components/Pairing';
import Footer from '../components/Footer';

function HomePage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        
        axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if(res.data.status) {
                    setIsAuthenticated(true);
                console.log("Logged In")
                }
                else {
                  console.log("not logged in")
                  navigate('/login');
                }
            }
            )

    }, [])

    if(!isAuthenticated){
        return null;
    }
    return (
        <div className=''>
            <Navbar />
            <Home />
            <Pairing />
            <Nutrition />
            <Working />
            <Contact />
            <Footer/>
 </div>
    )
}

export default HomePage