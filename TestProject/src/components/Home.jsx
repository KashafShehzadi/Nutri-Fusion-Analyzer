import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import axios from 'axios'

function Home() {
    
    
    const videoRef = useRef(null);
    const [isVideoPlaying, setVideoPlaying] = useState(true);
    //for play,pause video
    const toggleVideo = () => {
        const video = videoRef.current;

        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            setVideoPlaying(!isVideoPlaying);
        }
    };

    return (
        <div className='bg-transparent z-0 w-full h-screen  text-white' id="Home">

            <div>
                <video ref={videoRef} className="absolute left-0  top-0 w-full h-screen  object-cover z-10" autoPlay loop muted>
                    <source src="/src/assets/first.mp4" type="video/mp4" /></video>
                {/* For a slight dark layer in front of the video */}
                <div className="absolute  left-0 w-full h-screen items-center bg-black opacity-50 z-10"></div>
                <div className=" pt-2 absolute w-full   top-1/2 text-center items-center justify-center  text-white  p-8  z-20">

                    <h2 className="md:text-5xl font-bold ">Nutri-Fusion Analyzer</h2>
                    <ReactTyped
                        strings={[
                            "AI-powered food science", "Unleash the synergistic power", "Say goodbye to guesswork", "Beyond the plate", "Minus the Food confusion"]}
                        typeSpeed={40}
                        backSpeed={50}

                        loop
                    >
                        <input className="bg-transparent text-center h-auto text-myCustomColor font-medium md:text-2xl w-full " type="text" />
                    </ReactTyped>



                    <p className="text-lg md:text-xl lg:text-xl  mb-8">Unlock food synergy & avoid risks,Nutri-Fusion analyzes your meals, optimizes your nutrition.</p>

                </div>
                <button onClick={toggleVideo} className=" border-zinc-30 border-2 text-white px-4 py-2 rounded-md absolute bottom-1 right-0 z-50">{isVideoPlaying?"Pause Video":"Play Video"}</button>
            </div>
        </div>
    )
}

export default Home