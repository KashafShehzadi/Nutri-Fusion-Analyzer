import React, { useState, useEffect } from "react";
import { FiLogOut, FiPlus, FiSun, FiTrash } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeftSide = ({ show = false, foodPairs = [], setPairs, selectedPair, handleNewChatClick }) => {
  const navigate = useNavigate();

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/analyze/getQuery/${id}`);
      if (response.data.status) {
        selectedPair(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching query data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/analyze/deleteQuery/${id}`);
      if (response.data.status) {
        const updatedFoodPairsResponse = await axios.get('http://localhost:3000/analyze/userChatHistory');
        if (updatedFoodPairsResponse.data.status) {
          setPairs(updatedFoodPairsResponse.data.data);
          if (selectedPair && selectedPair._id === id) {
            selectedPair(null);
          }
        } else {
          console.error(updatedFoodPairsResponse.data.message);
        }
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  const handleLogOut = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className={`${show && " flex flex-col"} ${!show && "hidden"} bg-black md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col`}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-myCustomColor" onClick={handleNewChatClick}>
              <FiPlus />
              New chat
            </a>
            <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
              <div className="flex flex-col gap-2 text-gray-100 text-sm">
                {foodPairs.map(chat => (
                  <div key={chat._id} className="flex justify-between p-2 hover:bg-gray-700 rounded-md border border-white cursor-pointer">
                    <div onClick={() => handleClick(chat._id)}>
                      <p><strong>Food 1:</strong> {chat.foodItem1}</p>
                      <p><strong>Food 2:</strong> {chat.foodItem2}</p>
                    </div>
                    <FiTrash onClick={() => handleDelete(chat._id)} className="text-white cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" onClick={() => console.log('Toggle light mode')}>
                <FiSun className="h-4 w-4 text-myCustomColor font-bold" strokeWidth="2" />
                Light mode
              </a>
              <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" onClick={handleLogOut}>
                <FiLogOut className="h-4 w-4 text-myCustomColor font-bold" strokeWidth="2" />
                Log out
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
