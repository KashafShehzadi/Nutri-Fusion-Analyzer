import React, { useState,useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import LeftSide from '../components/Chat/LeftSide';
import RightSide from '../components/Chat/RightSide';
import  {useNavigate}  from 'react-router-dom';
import axios from 'axios'

const ChatBot = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/analyze/verify')
            .then(res => {
                if (res.data.status) {
                    setIsAuthenticated(true);
                    console.log("Logged In");
                    navigate('/chat');
                } else {
                    console.log("Not logged in");
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error("Verification error:", err);
                navigate('/login');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    // Ensure all hooks are called unconditionally
    const [show, setShow] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }
    return (
        <>
         <div>
            <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
                <button
                    type="button"
                    className={`-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center outline-none justify-center rounded-md focus:ring-1 focus:ring-white ${
                        !show && "!ring-0"
                    } dark:hover:text-white text-gray-100`}
                    onClick={() => setShow(!show)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <HiMenu />
                </button>
                <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
                <button type="button" className="px-3">
                    <AiOutlinePlus className="h-6 w-6" />
                </button>
            </div>

            <LeftSide {...{ show }}/>

            {/* Right Section */}
            <RightSide  />
        </div>
        </>
    );
};

export default ChatBot;
